"use strict";

const { MessageEmbed } = require("discord.js"),
    Command = require("../../Structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["pong"],
            description: "This provides the ping of the bot",
            category: "Utilities",
            cooldown: 10
        });
    }

    async run(message) {
        const msg = await message.channel.send(":ping_pong: Pinging..."),
            latency = msg.createdTimestamp - message.createdTimestamp

        const e = new MessageEmbed()
            .setColor("RANDOM")
            .addFields({
                name: "Bot Latency:",
                value: [
                    `${(latency).toLocaleString()}ms`
                ].join("\n")
            })

            .addFields({
                name: "API Latency:",
                value: [
                    `${Math.round(this.client.ws.ping).toLocaleString()}ms`
                ].join("\n")
            })

            .setTimestamp();

        await msg.edit({ content: '​', embeds: [e] });
    }
}
