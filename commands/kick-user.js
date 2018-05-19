module.exports = {
    name: 'kick',
    guildOnly: true,
    description: 'Reponse to the !kick command',
    execute(message, args) {
        if (!message.mentions.users.size) {
            message.reply(`To kick a darling. You need to add the '@' mention tag follow by their username`)
        }
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        else {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        };
    }
}