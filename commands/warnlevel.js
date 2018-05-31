const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
let warns = JSON.parse(fs.readFileSync('./database/warnings.json', 'utf8'));

module.exports = {
    name: 'warnlevel',
    description: 'Display member\'s warning level',
    async execute(message, args) {
        if (!message.mentions.users.size) {

            return message.reply('You need to @tag someone in your message darling!')
        }
        else {
            if(!message.member.hasPermission('MANAGE_MEMBERS')) return message.reply('Sorry darling, you do not have permission for that.');

            const taggedUser = message.mentions.users.first();
            let wUser = message.guild.member(taggedUser) || message.guild.members.get(args[0])

            let warnLevel = warns[wUser.id].warns

            message.channel.send(`<@${wUser.id}> has ${warnLevel} warnings.`)
        }
    }
}