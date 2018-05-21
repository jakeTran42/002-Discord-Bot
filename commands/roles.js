module.exports  = {
    name: 'role',
    description: 'Set/View roles for Users',
    args: true,
    modOnly: true,
    usage: '<user> <role>',
    execute(message, args){
        if (!message.mentions.users.size) {
            return message.reply('You need to tag someone in your message!')
        }
        console.log('Role Command Called')
    }
}