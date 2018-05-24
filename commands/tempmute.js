const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Moderator can mute someone for a period of time',
    guildOnly: true,
    args: true,
    modOnly: true,
    usage: '<user> <duration>',
    async execute(message, args) {
        if (!message.mentions.users.size) {
            message.reply(`To mute a darling. You need to add the '@' tag follow by their username and duration`)
        } 
        
        else {

            // Getting the user being muted
            const taggedUser = message.mentions.users.first();
            let mUser = message.guild.member(taggedUser) || message.guild.members.get(args[0])
            if (!mUser) return message.reply(`Cannot find ${taggedUser}`);

            // if user is already muted then return message
            if (mUser.roles.find(`name`, 'muted')) return message.reply('This darling had already been muted.')

            // getting mute duration
            let muteDuration = args[1];
            if (!muteDuration) return message.reply('You did not specified mute duration.')
            if (ms(muteDuration) > ms('1day')) return message.reply('Darling, this mute duration is too long, cannot be more than 1day!')

            // Check for moderator permission
            if (mUser.hasPermission("MANAGE_MESSAGES")) return message.reply(`This darling is a special specimen and cannot be mute.`)
            if (!message.member.hasPermission('DEAFEN_MEMBERS')) return message.reply('Sorry darling, you do not have permission to mute another darling.')
              
            // Find mute role
            let muteRole = message.guild.roles.find(`name`, 'muted');

            // If mute role does not exist, create one
            if (!muteRole) {
                // return message.reply('Mute role was not found, please create a mute role called \'muted\'')
                muteRole = message.guild.createRole({
                        name: "muted",
                        color: "#54535b",
                        permissions:[]
                })
                return message.channel.send('The server did not have a role called \'**muted**\', so I\'ve went went ahead and created one.\
                \nThe \`!mute\` command now will function properly.')
            }; // End of creating ch

            // adding mute role to message's channel and setting permisison
            await message.guild.channels.map((channel) => {
                channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false
                }).catch(e => {
                    console.log(e)
                }) 
            })

            // add role to user being mute
            await mUser.addRole(muteRole.id).catch(console.error)
            message.reply(`<@${mUser.id}> had been muted for ${ms(ms(muteDuration))}`)

            // set time out to when unmute user

            setTimeout(async () => {
                await mUser.removeRole(muteRole.id).catch(console.error)

                try {
                    await mUser.send(`Darling, you have been unmuted from ${message.guild} - ${message.channel}. Please behave yourself.`)
                }

                catch (error) {
                    message.channel.send(`${mUser} have been unmuted.\nThis message was blocked by ${mUser}'s DM so it was sent here instead.`)
                } 

            }, ms(muteDuration))
        }
    }
}