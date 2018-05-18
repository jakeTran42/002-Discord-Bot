// environment variables
require('dotenv').config();
const {prefix} = require('./config/config.json');
const greeting_msg = require('./greetings/greetings.json');
const messages = require('./greetings/greeting.js');

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
    if ([`${prefix}hi`, `${prefix}hello`].includes(message.content)) {
        console.log(typeof messages)
        console.log(messages)
    } 
    
    else if ([`${prefix}night`, `${prefix}goodnight`].includes(message.content)) {
        message.channel.send(greeting_msg.goodnight_msg);
    }

    else if (message.content === `${prefix}server`) {
        message.channel.send(`This Plantation is: '${message.guild.name}'
        \nTotal Parasites: ${message.guild.memberCount}
        \nPlantation Creation Date: ${message.guild.createdAt}
        \nPlantation Current Location: ${message.guild.region}`);
    }

});


// login to Discord with your app's token
client.login(process.env.TOKEN);