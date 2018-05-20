module.exports = {
    name: 'findCommand',
    description: 'Find the command matching prefix and check for alias',
    execute(message, commandName) {
        // if our dynamic command files have the command name, if not return
        // if (!client.commands.has(commandName)) return;

        // getting command object base on command name
        // const command = client.commands.get(commandName);

        // const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        const { commands } = message.client;
        return commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    }
}