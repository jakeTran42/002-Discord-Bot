const Discord = require('discord.js')

module.exports = {
    name: 'modOnly',
    description: 'Helper function to help check if the command is reserve for mod or officer only',
    execute(message, command) {
        
        if (command.guildOnly)
            memberStatus = message.guild.member(message.author)
            if (command.modOnly && !memberStatus.roles.find(`name`, 'moderator')) {
                if (!message.guild.roles.find(`name`, 'moderator')) {

                    message.guild.createRole({
                        name: "moderator",
                        color: "#12876f",
                        permissions:[
                            'CREATE_INSTANT_INVITE',
                            'MANAGE_MESSAGES',
                            'MANAGE_CHANNELS',
                            'ADD_REACTIONS',
                            'READ_MESSAGES',
                            'SEND_MESSAGES',
                            'CONNECT',
                            'SPEAK',
                            'MUTE_MEMBERS',
                            'MOVE_MEMBERS'
                        ]
                })

                return message.channel.send('Hey darlings, \'moderator\' role was not found so I\'ve created it. Please ask admin to add member with any form of mod status to the moderator role so they can use moderator commands')
                    
                }            
                return message.reply('Sorry darling, this command is for special specimens only. Contact admin if you\'d like to be added as a moderator role.')
        }

        else {
            return false
        }
    }
}