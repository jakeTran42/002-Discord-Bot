const Discord = require('discord.js');

module.exports  = {
    name: 'addrole',
    description: 'Add roles for Users',
    args: true,
    modOnly: true,
    guildOnly: true,
    usage: '<user> <role>',
    async execute(message, args){
        if (!message.mentions.users.size) {
            message.reply(`To add role to a darling. You need to add the '@' tag follow by their username and intended role`)
        } 

        else {

            if(args.length < 2 || !args[0].startsWith('<@')) return message.reply(`You need to use this command in this format \`!addrole <user> <role>\`  <role> can be any length`)

            if(!message.member.hasPermission('MANAGE_MEMBERS')) return message.reply(`Sorry darling, you do not have permission to add role`);
            const taggedUser = message.mentions.users.first();
            let rMember = message.guild.member(taggedUser) || message.guild.members.get(args[0])
            let roleAdd = [...args].slice(1).join(' ');
            if(!roleAdd) return message.reply("Darling, you need to supply a role to assign. Use \`!modcommands addrole\` if you need help.")

            let gRole = message.guild.roles.find(`name`, roleAdd);
            if (!gRole) return message.reply('I cannot find that role darling, Please create it and retry.')

            if (rMember.roles.has(gRole.id)) return message.reply('This darling already have that role')
            await rMember.addRole(gRole.id)

            try {
                await rMember.send(`Congrats darling! you have been assigned the role **__${gRole.name}__** in the server: **${message.guild.name}**`)
            }
            catch (error) {
                message.channel.send(`Congrats darling! ${rMember} have been assigned the role: **__${gRole.name}__**\n${rMember}'s dm was blocked so this message is sent here.`)
            }
        }

    }
}