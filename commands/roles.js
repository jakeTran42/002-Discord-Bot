module.exports  = {
    name: 'role',
    description: 'View roles for Users',
    args: true,
    guildOnly: true,
    usage: '<user>',
    async execute(message, args){
        if (!message.mentions.users.size) {
            return message.reply('You need to @tag someone in your message darling!')
        }
        // create an empty array to push roles into
        const rolesArr = []

        const taggedUser = message.mentions.users.first();
        let rMember = message.guild.member(taggedUser) || message.guild.members.get(args[0])

        rMember.roles.map(async (role) => {
            await rolesArr.push(role.name)
        })

        return message.channel.send(`This darling have these roles assigned to them: \n**${rolesArr.slice(1).join('  |  ')}**`)
        
    }
}