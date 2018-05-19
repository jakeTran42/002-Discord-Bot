module.exports = {
    name: 'server',
    description: 'Reply to user who do !server command',
    execute(message, args) {
        message.channel.send(`This Plantation is: '${message.guild.name}'
        \nTotal Parasites: ${message.guild.memberCount}
        \nPlantation Creation Date: ${message.guild.createdAt}
        \nPlantation Current Location: ${message.guild.region}`);
    }
}