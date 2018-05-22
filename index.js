require('dotenv').config();

// environment variables
const fs = require('fs')
const { prefix } = require('./config/config.json');

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

// Creating Ultility functions for commands
ultilFunc = new Discord.Collection()
const utilsFiles = fs.readdirSync('./ultils');

for (const files of utilsFiles) {
    const ultil = require(`./ultils/${files}`);
    ultilFunc.set(ultil.name, ultil)
}



// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on(('ready'), () => {
    console.log('Ready!');
    // const guildList = client.guilds.array();
    // try {
    //     guildList.map(guild => {
    //         let generalChannel = guild.channels.find(`name`, 'general')
    //         return generalChannel.send('Hello darlings! I\'m back online from some testings')
    //     })
    // } catch (error) {
    //     console.log('Cannot send online messages')
    // }
});

client.on('message', message => {

    // sanity check if message have prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    // getting arguments and command name
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // find the appropriate command base on command name
    const command = ultilFunc.get('findCommand').execute(message, commandName)
    if (!command) return;

    // if the command is guild Only and cannot be called in DM
    if (ultilFunc.get('guildOnly').execute(message, command)){
        return
    }

    if (ultilFunc.get('modOnly').execute(message, command)) {
        return
    }

    // if the command needs and argument and user previded with none
    if (ultilFunc.get('argHelper').execute(message, command, args)) {
        return
    }

    // For command that need to have cooldowns, managing cooldowns for users
    if (ultilFunc.get('cooldownsManager').execute(message, command, cooldowns)) {
        return
    }

    // running command here if everything checks out
    try {
        command.execute(message, args, command);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});


// login to Discord with your app's token
client.login(process.env.TOKEN);