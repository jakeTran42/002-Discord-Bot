module.exports = {
    name: 'my-info',
    description: 'Display the current user\'s info',
    execute(message, args) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
}