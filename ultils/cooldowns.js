const Discord = require('discord.js');

module.exports = {
    name: 'cooldownsManager',
    description: 'Manage cooldown for commands for users',
    execute(message, command, cooldowns) {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
    
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
    
        if (!timestamps.has(message.author.id)) {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
        else {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(` Darling, please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`!${command.name}\` command.`);
            }
        
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
    }
}