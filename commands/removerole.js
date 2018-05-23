const Discord = require('discord.js');

module.exports  = {
    name: 'removerole',
    description: 'Add roles for Users',
    args: true,
    modOnly: true,
    guildOnly: true,
    usage: '<user> <role>',
    async execute(message, args){
        if (!message.mentions.users.size) {
            message.reply(`To remove a role, you need to add the '@' tag follow by their username and duration`)
        } 

        else {
            if(!message.member.hasPermission('MANAGE_MEMBERS')) return message.reply(`Sorry darling, you do not have permission to remove a role`);
            const taggedUser = message.mentions.users.first();
            let rMember = message.guild.member(taggedUser) || message.guild.members.get(args[0])
            let roleAdd = args.slice(1).join(' ');
            if(!roleAdd) return message.reply("Darling, you need to supply a role to assign. Use \`!modcommands addrole\` if you need help.")

            let gRole = message.guild.roles.find(`name`, roleAdd);
            if (!gRole) return message.reply('I cannot find that role darling, Please create it and retry.')

            if (!rMember.roles.has(gRole.id)) return message.reply('This darling does not have this role.')
            await rMember.removeRole(gRole.id)

            try {
                await rMember.send(`Sorry darling! you have been revoked of the role **__${gRole.name}__** in the server: **${message.guild.name}**`)
            }
            catch (error) {
                message.channel.send(`${rMember} have been revoked of the role: **__${gRole.name}__**\n${rMember}'s dm was blocked so this message is sent here.`)
            }
        }

    }
}