// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content.includes('hi 002')) {
        message.channel.send('Hello my Darling!')
    }
});

// login to Discord with your app's token
client.login('NDQ2NTgxMzI1NTc5ODEyODY0.Dd7K1A.xcD17803AJiYKJiPvG7AVAHXTqE');