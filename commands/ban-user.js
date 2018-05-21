const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    guildOnly: true,
    description: 'Reponse to the !ban command',
    modOnly: true,
    execute(message, args) {
        if (!message.mentions.users.size) {
            message.reply(`To ban a darling. You need to add the '@' mention tag follow by their username`)
        }
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        else {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`**${message.author.username}** wanted to ban: **${taggedUser.username}**`);

            // getting the user being baned info inside the server
            let bUser = message.guild.member(taggedUser) || message.guild.members.get(args[0])
            if (!bUser) return message.reply(`Cannot find ${taggedUser}`);

            // getting the reason why theyre being ban
            let bReason = [...args].slice(1).join(' ')
            if (!bReason) return message.reply('Darling, you need a reason to ban this member. Please add it after tagging them.')

            // Getting moderator permission status
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`Sorry darling, you do not have permission to ban another darling`)
            if (bUser.hasPermission("MANAGE_CHANNELS")) return message.reply(`This darling is a special specimen and cannot be baned.`)

            let banEmbed = new Discord.RichEmbed()
            .setDescription('**~Ban~**')
            .setColor('#c40f42')
            .addField('Banned User ', `${bUser} with ID ${bUser.id}`)
            .addField('Banned By ', `<@${message.author.id}> with ID ${message.author.id}`)
            .addField('Channel Banned In ', `${message.channel}`)
            .addField('Time Banned: ', `${message.createdAt}`)
            .addField('Reason: ', bReason)

            let banChannel = message.guild.channels.find('name', 'bans');
            if(!banChannel) return message.reply("Cannot find 'bans' channel, please create one so I can logged the bans.")

            message.guild.member(bUser).ban(bReason)
            banChannel.send(banEmbed)
        }
    }
}