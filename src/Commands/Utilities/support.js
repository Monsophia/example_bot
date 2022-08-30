"use strict";

const Command = require("../../Structures/Command"),
    { EmbedBuilder, MessageEmbed } = require("discord.js")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'support',
            category: "Utilities",
        });
    }

    // eslint-disable-next-line no-unused-vars

    async run(message) {
        const e = new MessageEmbed()
            .setColor("RANDOM")
            .addFields({
                name: `Support Server`,
                value: [
                    `Support [here](https://discord.gg/uRYUSqmPrn)`,
                ].join("\n")
            })
            .setTimestamp();
        message.channel.send({ embeds: [e] });
    }
};
