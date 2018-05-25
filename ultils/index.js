module.exports.findRole = async (message, args, role) => {

    let intendedRole = message.guild.roles.find(`name`, role);

    if (!intendedRole) {
        try {
            let intendedRole = message.guild.createRole({
                name: role,
                permissions:[]
            }).then((intendedRole) => {
                console.log(intendedRole.name)
                return intendedRole
            })
        } catch (e) {
            return false
        }
    }

    return intendedRole

}

module.exports.addRoleToCh = async (message, args, intendedRole, permissions) => {

    await message.guild.channels.map((channel) => {
        channel.overwritePermissions(intendedRole, permissions).catch(e => {
            console.log(e)
        }) 
    })

}