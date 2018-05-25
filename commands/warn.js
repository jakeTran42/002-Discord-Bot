const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
// const { findRole } = require('../ultils/index.js')
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
            if(args.length < 2 || !args[0].startsWith('<@')) return message.reply(`You need to use this command in this format \`!warning <user> <reason>\`  <reason> can be any length`);
            if(!message.member.hasPermission('MANAGE_MEMBERS')) return message.reply('Sorry darling, you do not have permission for that.');


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
            });

            // Message to warn user
            let messageData = `__${wUser}, you have been warned by **${message.author}**__ \nReason: "**${reason}**"\nChannel: **${message.channel}**\nServer: **${message.guild}**.\
            \nThis is your **__${warns[wUser.id].warns}__** warnings. Please behave according to server's guideline.`

            // Finding and sending message to incident channel
            let incidentCh = message.guild.channels.find(`name`, 'incidents')

            if(!incidentCh) {
                incidentCh = await message.guild.createChannel('incidents', 'text')
            }

            everyoneRole = message.guild.roles.find(`name`, '@everyone')

            if (everyoneRole && incidentCh) {
                await incidentCh.overwritePermissions(everyoneRole, {
                    SEND_MESSAGES: false,
                    SEND_REACTIONS: false
                })
            }

            if(incidentCh) incidentCh.send(messageData)


            // DM the user also
            taggedUser.send(messageData, { split: true })
                .then(() =>{
                message.channel.send(`${wUser}, I have sent you a warning in your DM and to 'incidents' channel (if it exist)`);
            })
                .catch(() => {
                message.channel.send(`${wUser}, your DM is blocked so please check the incidents channel (if it exist) for your warning.`);
            })

            if (warns[wUser.id].warns > 6) {

                let muteRole = message.guild.roles.find(`name`, 'muted');

                if (!muteRole) {
                    muteRole = message.guild.createRole({
                        name: 'muted',
                        permissions:[]
                    }).then(async (muteRole) => {
                        await wUser.addRole(muteRole.id)
                    }).then((muteRole) => {
                        // setTimeout(() => {
                        //     wUser.removeRole(muteRole)
                        // }, ms('10s'));
                    }).catch((e) => {console.log(e)})
                } else{
                    await wUser.addRole(muteRole.id)
                    setTimeout(() => {
                        wUser.removeRole(muteRole)
                    }, ms('10s'));
                }

                await message.guild.channels.map((channel) => {
                    channel.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    }).catch(e => {
                        console.log(e)
                    }) 
                })

            }

        }
    }
}