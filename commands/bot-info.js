const Discord = require('discord.js');

module.exports = {
    name: 'botinfo',
    aliases: ['bot'],
    description: 'Display server\'s bot info',
    execute(message, args) {

        const { username, createdAt, avatarURL } = message.client.user

        const botEmbed = new Discord.RichEmbed()
        .setColor('#eda6d1')
        .addField('**__My name is__** ', username)
        .addField('**__I was created on__** ', createdAt)
        .addField('**__How to use me__**:', 'Please use \`!help\` or \`!commands\` to view all my commands')
        .setFooter('©Ensign', avatarURL)
        .setTimestamp()

        return message.channel.send(botEmbed)
    }
}
