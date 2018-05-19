const time_greeting = require('../greetings/greeting.js');

module.exports = {
    name: 'hi',
    aliases: ['hello', 'greeting', 'konnichiwa'],
    description: 'Reply to the greeting command based on current time',
    execute(message, args) {
        message.channel.send(time_greeting())
    }
}
