const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Moderator can mute someone for a period of time',
    guildOnly: true,
    args: true,
    usage: '<user> <duration>',
    execute(message, args) {
        if (!message.mentions.users.size) {
            message.reply(`To mute a darling. You need to add the '@' tag follow by their username and duration`)
        } 
        
        else {

            // Getting the user being muted
            const taggedUser = message.mentions.users.first();
            let mUser = message.guild.member(taggedUser) || message.guild.members.get(args[0])
            if (!mUser) return message.reply(`Cannot find ${taggedUser}`);

            // Check for moderator permission
            if (mUser.hasPermission("MANAGE_MESSAGES")) return message.reply(`This darling is a special specimen and cannot be mute.`)
            if (!message.member.hasPermission('DEAFEN_MEMBERS')) return message.reply('Sorry darling, you do not have permission to mute another darling.')
              
            // Find mute role
            let muteRole = message.guild.roles.find(`name`, 'muted');

            // If mute role does not exist, create one
            if (!muteRole) {
                try {
                    muteRole = message.guild.createRole({
                        name: 'muted',
                        color: '#3a365e',
                        permissions: []
                    })
                    message.guild.channels.map((channel, id) => {
                        await channel.overwritePermission(muteRole {
                            SEND_MESSAGES: false,
                            SEND_REACTIONS: false
                        })
                    })
                }
                catch (e) {
                    console.log(e)
                }
            }; // End of creating ch



        }
    }
}