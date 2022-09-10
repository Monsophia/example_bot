"use strict";

const Command = require("../../Structures/Command"),
    { EmbedBuilder, MessageEmbed } = require("discord.js"),
    moment = require("moment")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["user", "ui", "lookup", "whois", "u"],
            description: "Displays information about a provided user or the message author.",
            category: "Information",
            usage: "[user]",
        });
    }

    async run(message, [target]) {
        const user = message.mentions.users.last() || !isNaN(target) && await message.client.users.fetch(target) || message.author;
        const member = message.guild.members.cache.get(user.id);

        const embed = new MessageEmbed()
            .setDescription(`**User information for __${user.username}__**`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(user.displayHexColor || "RANDOM")
            .addFields({
                name: "User",
                value: [
                    `Username: ${user.tag}`,
                    `Discriminator: ${user.discriminator}`,
                    `ID: ${user.id}`,
                    `Time Created: ${moment(user.createdTimestamp).format("LT")} ${moment(user.createdTimestamp).format("LL")} ${moment(user.createdTimestamp).fromNow()}`,
                    `\u200b`,
                ].join("\n")
            });

        if (member) {
            embed.addFields({
                name: "Member",
                value: [
                    `Displayname: ${member.displayName}`,
                    `Server Join Date: ${moment(member.joinedAt).format("LL LTS")}`,
                    `\u200b`,
                ].join("\n")
            })
                .setTimestamp();
        }

        return await message.channel.send({ embeds: [embed] });

    }
};