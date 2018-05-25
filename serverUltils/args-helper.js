const { prefix } = require('../config/config.json');

module.exports = {
    name: 'argHelper',
    description: 'Help user find use the right arguments for a command if they didnt provide any that require <usage>',
    execute(message, command, args) {
        if (command.args && !args.length) {
            let reply = `Darling didn't provide any arguments, ${message.author}!`;
            if (command.usage) {
                reply += `\nThe proper usage of !${command.name} would be: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        };
    }
}