module.exports = {
    name: 'prune',
    guildOnly: true,
    modOnly: true,
    cooldown: 10,
    args: true,
    usage: '<number>',
    description: 'Prune {x} amount of messages in channel',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;
    
        if (isNaN(amount)) {
            return message.reply('Darling, that doesn\'t seem to be a valid number.');
        }

        else if (amount <= 1 || amount > 100) {
            return message.reply('Darling, you can only prune 1 to 100 messages at a time!');
        }

        else {
            message.channel.bulkDelete(amount, true).catch((err) => {
                message.channel.send('There are an error with the prunning command. Please report this error to head of plantation.')
            });
            message.channel.send(`Darlings, I finished deleting ${amount - 1} messages in this channel.`)
        };
    }
}