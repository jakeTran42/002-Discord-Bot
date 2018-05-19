require('dotenv').config();

// environment variables
const fs = require('fs')
const {prefix} = require('./config/config.json');

// require the discord.js module
const Discord = require('discord.js');
const cooldowns = new Discord.Collection();

// create a new Discord client
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on(('ready'), () => {
    console.log('Ready!');
});

client.on('message', message => {

    // sanity check if it have prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    // getting arguments and command name
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // if our dynamic command files have the command name, if not return
    // if (!client.commands.has(commandName)) return;

    // getting command object base on command name
    // const command = client.commands.get(commandName);

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    // if the command is guild Only and cannot be called in DM
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('Sorry darling, I can\'t execute that command inside DMs!');
    }

    // if the command needs and argument and user previded with none
    if (command.args && !args.length) {
        let reply = `Darling didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage of !role would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    };

    // For command that need to have cooldowns
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    else {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(` Darling, please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`!${command.name}\` command.`);
        }
    
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    // running command here if everything checks out
    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});


// login to Discord with your app's token
client.login(process.env.TOKEN);