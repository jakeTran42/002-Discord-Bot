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

});


// login to Discord with your app's token
client.login(process.env.TOKEN);