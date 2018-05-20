const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    guildOnly: true,
    args: true,
    usage: '<user> <reason>',
    description: 'Reponse to the !kick command',
    execute(message, args) {
        if (!message.mentions.users.size) {
            message.reply(`To kick a darling. You need to add the '@' tag follow by their username`)
        }
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        else {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`**${message.author.username}** wanted to kick: **${taggedUser.username}**`);

            // getting the user being kicked info inside the server
            let kUser = message.guild.member(taggedUser) || message.guild.members.get(args[0])
            if (!kUser) return message.reply(`Cannot find ${taggedUser}`);

            // getting the reason why theyre being kick
            let kReason = [...args].slice(1).join(' ')
            if (!kReason) return message.reply('Darling, you need a reason to kick this member. Please add it after tagging them.')

            // Getting moderator permission status
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`Sorry darling, you do not have permission to kick another darling`)
            if (kUser.hasPermission("MANAGE_CHANNELS")) return message.reply(`This darling is a special specimen and cannot be kicked.`)

            let kickEmbed = new Discord.RichEmbed()
            .setDescription('**~Kick~**')
            .setColor('#c80ccc')
            .addField('Kicked Darling ', `${kUser} with ID ${kUser.id}`)
            .addField('Kicked By ', `<@${message.author.id}> with ID ${message.author.id}`)
            .addField('Channel Kicked In ', `${message.channel}`)
            .addField('Time Kicked: ', `${message.createdAt}`)
            .addField('Reason: ', kReason)
            .setFooter(`Logged by ${message.client.user.username}`, message.client.user.avatarURL)
            .setTimestamp()

            let kickChannel = message.guild.channels.find('name', 'incidents');
            if(!kickChannel) return message.reply("Cannot find 'incidents' channel, please create one so I can logged the incident.")

            message.guild.member(kUser).kick(kReason)
            return kickChannel.send(kickEmbed)
        }
    }
}