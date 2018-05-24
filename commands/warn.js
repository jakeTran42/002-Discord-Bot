const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
let warns = JSON.parse(fs.readFileSync('./database/warnings.json', 'utf8'));

module.exports = {
    name: 'warning',
    description: 'Set a warning to member',
    args: true,
    usage: '<user> <reason>',
    guildOnly: true,
    modOnly: true,
    async execute(message, args) {

        if (!message.mentions.users.size) {

            return message.reply('You need to @tag someone in your message darling!')
        }

        else {
            if(args.length < 2 || !args[0].startsWith('<@')) return message.reply(`You need to use this command in this format \`!warning <user> <reason>\`  <reason> can be any length`)
            if(!message.member.hasPermission('MANAGE_MEMBERS')) return message.reply('Sorry darling, you do not have permission for that.')

            const taggedUser = message.mentions.users.first();
            let wUser = message.guild.member(taggedUser) || message.guild.members.get(args[0])
            if(wUser.hasPermission('MANAGE_MESSAGES')) return message.reply('This darling is a special specimen and cannot be warn!')
            let reason = [...args].slice(1).join(' ');

            if(!warns[wUser.id]) {
                warns[wUser.id] = {warns: 0};
            };

            warns[wUser.id].warns++;

            fs.writeFile('./database/warnings.json', JSON.stringify(warns), (err) => {
                if (err) console.log(err)
            })

            let messageData = `__You have been warned by **${message.author}**__ \nReason: "**${reason}**"\nChannel: **${message.channel}**\nServer: **${message.guild}**.\
            \nThis is your **__${warns[wUser.id].warns}__** warnings. Please behave according to server's guideline.`


            taggedUser.send(messageData, { split: true })
                .then(() =>{
                message.channel.send(`${wUser}, I have sent you a warning in your DM`)
            })
                .catch(() => {
                message.channel.send(`${wUser}, your DM is blocked so please check the incident channel for your warning.`)
            })

        }
    }
}