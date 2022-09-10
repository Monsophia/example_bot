"use strict";

const { MessageEmbed } = require("discord.js"),
    Command = require("../../Structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'stats',
            category: "Information",
        });
    }

    async run(message) {
        const client = this.client,
            msg = message

        const e = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor("RANDOM")
            .setTimestamp()
            .addFields({
                name: `${client.user.username}\'s stats`,
                value: [
                    `Servers: ${this.client.guilds.cache.size.toLocaleString()} `,
                    `Users: ${this.client.users.cache.size.toLocaleString()}`,
                    `Channels: ${this.client.channels.cache.size.toLocaleString()}`,
                    `Bot Shards: ${msg.guild.shard.id}/${client.shard.count}`
                ].join("\n")
            })

        message.channel.send({ embeds: [e] });
    }
};