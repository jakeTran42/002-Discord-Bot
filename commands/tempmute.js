const Discord = require('discord.js');
const ms = require('ms');

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
                return message.reply('Mute role was not found, please create a mute role called \'muted\'')
            }; // End of creating ch

            let muteDuration = args[1];
            if (!muteDuration) return message.reply('You did not specified mute duration.')

            mUser.addRole(muteRole.id)
            message.reply(`<@${mUser.id}> had been muted for ${ms(ms(muteDuration))}`)

            setTimeout(() => {
                mUser.removeRole(muteRole.id)
                mUser.send(`Darling, you have been unmuted from ${message.channel}. Please behave yourself.`)
            }, ms(muteDuration))

        }
    }
}