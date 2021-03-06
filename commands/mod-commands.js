const { prefix } = require('../config/config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'modcommands',
    modOnly: true,
    guildOnly: true,
    description: 'List all of moderator\'s commands.',
    cooldown: 5,
    execute(message, args) {
        const { commands } = message.client;
        const{ username, avatarURL } = message.client.user
        const commandEmbed = new Discord.RichEmbed()
        .setAuthor(username, avatarURL).setColor('#4852d6')
        .addField('To View Specific Command: ', `You can send **__${prefix}modcommands [command name]__**`)
        .addBlankField(true)
        .setFooter(message.guild || message.author.username, avatarURL).setTimestamp()

        if (!args.length) {

            commands.map((command) => {
                if(command.modOnly) {
                    commandEmbed.addField(`!${command.name}`, `*${command.description}*`)
                }
            })

        }
        else {
            if (!commands.has(args[0])) {
                return message.reply('that\'s not a valid command darling!');
            }
            
            const command = commands.get(args[0]);

            commandEmbed.addField('Command Name:', `**${command.name}**`)
            if (command.description) commandEmbed.addField('Command Description:', command.description)
            if (command.aliases) commandEmbed.addField('Command Aliases:', command.aliases.join(' | '))
            if (command.usage) commandEmbed.addField('Command Usages:', `**${prefix}${command.name} ${command.usage}**`)
            commandEmbed.addField('Command Cooldown:', `${command.cooldown || 3} second(s)`).addBlankField(true)
        }

        message.author.send(commandEmbed)
            .then(() => {
                if (message.channel.type !== 'dm') {
                    message.reply('I\'ve sent you a DM with all my commands!');
                }
            })
            .catch(() => message.reply('it seems like I can\'t DM you!'));
        
        return
    },
}