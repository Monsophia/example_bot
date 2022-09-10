"use strict";

const Command = require("../../Structures/Command"),
    { EmbedBuilder } = require("discord.js"),
    moment = require("moment");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["server", "guildinfo", "si"],
            description: "Displays information about the server that said message was run in.",
            category: "Information",
        });
    }

    async run(message, args) {
        const msg = message,
            client = this.client

        const embed = new EmbedBuilder()
            .setDescription(`**Guild information for __${message.guild.name}__**`)
            .setColor("Random")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addFields({
                name: "General",
                value: [
                    `Name: ${message.guild.name}`,
                    `ID: ${message.guild.id}`,
                    `Owner: ${(await message.guild.fetchOwner()).user.tag}`,
                    `Owner ID: ${message.guild.ownerId}`,
                    `Time Created: ${moment(message.guild.createdTimestamp).format("LT")} ${moment(message.guild.createdTimestamp).format("LL")} (${moment(message.guild.createdTimestamp).fromNow()})`,
                    "\u200b",
                ].join("\n")
            })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};