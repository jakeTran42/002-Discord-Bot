const ms = require('ms');

module.exports = {
    name: 'remindme',
    args: true,
    usage: '<time> <message>',
    description: 'Send a message to user with their reminder message',
    async execute(message, args, command) {
        if (args.length < 2 || !ms(args[0])) {
            return message.reply(`Sorry darling, you didnt provide me with the apropriate command arguments like \`!${command.name} ${command.usage}\``)
        }
        else {

            timer = args[0]
            messages = args.slice(1).join(' ');

            try {
                await message.author.send('Your reminder had been set darling!')
            } catch (e) {
                return message.reply('It seems like I can\'t DM you darling! Please enable DM you if you wish to get a reminder.')
            }

            setTimeout(async () => {
                try {
                    await message.author.send(`You've set a reminder at this time with the message:\n\'**${messages}**\'`)
                } catch (e) {
                    console.log(e)
                }
            }, ms(timer));


        }
    }
}