// environment variables
require('dotenv').config();
const {prefix} = require('./config/config.json');
const greeting_msg = require('./greetings/greetings.json');
const time_greeting = require('./greetings/greeting.js');

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on(('ready'), () => {
    console.log('Ready!');
});

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if ((command === ('hi')) || (command === ('hello'))) {
        return message.channel.send(time_greeting())
    } 
    
    else if ((command === ('night')) || (command === ('goodnight'))) {
        return message.channel.send(greeting_msg.goodnight_msg);
    }

    else if (command === ('server')) {
        return message.channel.send(`This Plantation is: '${message.guild.name}'
        \nTotal Parasites: ${message.guild.memberCount}
        \nPlantation Creation Date: ${message.guild.createdAt}
        \nPlantation Current Location: ${message.guild.region}`);
    } 
    
    else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        message.channel.send(`First argument: ${args[0]}`)
    }

    else if (command === 'kick') {
        if (!message.mentions.users.size) {
            message.reply(`To kick a darling. You need to add the '@' mention tag follow by their username`)
        }
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        else {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        };
    }

    else if (command === 'my-info') {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }

    else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }

        else {
            const avatarList = message.mentions.users.map((user) => {
                return message.channel.send(`${user.username}'s Avatar: ${user.displayAvatarURL}`);
            })
            // message.channel.send(avatarList)
        }
    }

    else if (command === 'prune') {
        const amount = parseInt(args[0]) + 1;
    
        if (isNaN(amount)) {
            return message.reply('Darling, that doesn\'t seem to be a valid number.');
        }

        else if (amount <= 1 || amount > 100) {
            return message.reply('Darling, you can only prune 1 to 100 messages at a time!');
        }

        else {
            message.channel.bulkDelete(amount, true).catch((err) => {
                message.channel.send('There are an error with the prunning command. Please report this error to head of plantation.')
            });
            message.channel.send(`Darlings, I finished deleting ${amount - 1} messages in this channel.`)
        }
    }

});


// login to Discord with your app's token
client.login(process.env.TOKEN);