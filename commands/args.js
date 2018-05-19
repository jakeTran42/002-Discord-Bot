module.exports = {
    name: 'args-info',
    args: true,
    description: 'Reply back to user according to their arguments',
    execute(message, args) {

        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
         message.channel.send(`Arguments: ${args.join(' ')}\nArguments length: ${args.length}`);
    }
}