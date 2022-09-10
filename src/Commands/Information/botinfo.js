"use strict";

const { EmbedBuilder } = require("discord.js"),
    { version, license } = require("../../../data/config.json"),
    Command = require("../../Structures/Command"),
    { utc } = require("moment");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["info", "bot", "bi"],
            description: "Displays information about the bot.",
            category: "Information"
        });
    }

    async run(message) {
        const client = this.client,
            msg = message

        const embed = new EmbedBuilder()
            .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
            .setColor("Random")
            .setDescription(`**Bot information for __${client.user.username}__**`)
            .addFields({
                name: "General",
                value: [
                    `Client: ${this.client.user.tag}`,
                    `ID: ${this.client.user.id}`,
                    `Bot Shards: ${msg.guild.shard.id}/${client.shard.count}`,
                    `Commands: ${this.client.commands.size}`,
                    `Aliases: ${this.client.aliases.size.toLocaleString()}`,
                    `Servers: ${this.client.guilds.cache.size.toLocaleString()} `,
                    `Users: ${this.client.users.cache.size.toLocaleString()}`,
                    `Channels: ${this.client.channels.cache.size.toLocaleString()}`,
                    `Creation Date: ${utc(this.client.user.createdTimestamp).format("Do MMMM YYYY HH:mm:ss")}`,
                    "\u200b",
                ].join("\n")
            })

            .addFields({
                name: `Misc`,
                value: [
                    `Client version: ${version}`,
                    `License: ${license}`
                ].join("\n")
            })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};