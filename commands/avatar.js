module.exports = {
    name: 'avatar',
    description: 'Display all tagged user avatar',
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }

        else {
            const avatarList = message.mentions.users.map((user) => {
                return message.channel.send(`${user.username}'s Avatar: ${user.displayAvatarURL}`);
            })
            // message.channel.send(avatarList)
        };
    }
}