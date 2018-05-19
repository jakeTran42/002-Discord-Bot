const greeting_msg = require('../greetings/greetings.json');

module.exports = {
    name: 'goodnight',
    description: 'Reply to the user when they say good night',
    execute(message, args) {
        message.channel.send(greeting_msg.goodnight_msg);
    }
}