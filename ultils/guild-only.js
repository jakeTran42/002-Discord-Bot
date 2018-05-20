module.exports = {
    name: 'guildOnly',
    description: 'Reply to use if they try to DM bot with command that is guild-only',
    execute(message, command) {
        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('Sorry darling, I can\'t execute that command inside DMs!');
        }
    }
}