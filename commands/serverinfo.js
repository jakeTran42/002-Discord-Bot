const Discord = require('discord.js');
var dateFormat = require('dateformat');

module.exports = {
    name: 'server',
    guildOnly: true,
    description: 'Reply to user who do !server command',
    execute(message, args) {

        const serverCreationDate = dateFormat(message.guild.createdAt, 'longDate')

        const serverEmbed = new Discord.RichEmbed()
        .addField('This Plantation\'s Name:', message.guild.name, true)
        .addField('Total Parasites:', message.guild.memberCount, true)
        .addField('Plantation Creation Date:', serverCreationDate, true)
        .addField('Plantation\'s Current Location:', message.guild.region, true)
        .setColor('#8e30ba')

        message.channel.send(serverEmbed)
    }
}