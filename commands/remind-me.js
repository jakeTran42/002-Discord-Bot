const ms = require('ms');

module.exports = {
    name: 'remindme',
    args: true,
    usage: '<time> <message>',
    description: 'Send a message to user with their reminder message',
    execute(message, args, command) {
        if (args.length < 2 || !ms(args[0])) {
            return message.reply(`Sorry darling, you didnt provide me with the apropriate command arguments like \`!${command.name} ${command.usage}\``)
        }
        else {

            timer = args[0]
            messages = args.slice(1).join(' ');

            message.author.send('Your reminder had been set darling!')
            .catch((error) => {
                console.log(error)
                return message.reply('it seems like I can\'t DM you!')
            });

            setTimeout(() => {
                message.author.send(`You've set a reminder at this time with the message:\n\'**${messages}**\'`)
            }, ms(timer));
        }
    }
}