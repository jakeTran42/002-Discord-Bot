module.exports  = {
    name: 'role',
    args: true,
    usage: '<user> <role>',
    execute(message, args){
        if (!message.mentions.users.size) {
            return message.reply('You need to tag someone in your first argument!')
        }
        console.log('Role Command Called')
    }
}