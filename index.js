// environment variables
require('dotenv').config();

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on(('ready', 'message'), () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content.includes('!hi')) {
        message.channel.send('Hello my Darling! How Are you today?' + ':smiling_imp:')
    }
});

// login to Discord with your app's token
client.login(process.env.TOKEN);