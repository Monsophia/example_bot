
"use strict";

const Command = require("../../Structures/Command"),
    NSFW = require("nsfw-discord"),
    { MessageEmbed } = require("discord.js");


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "gonewild",
            category: "NSFW",
            nsfw: true
        });
    }
    // eslint-disable-next-line no-unused-vars

    async run(message) {
        const nsfw = new NSFW();

        const image = await nsfw.gonewild();
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setImage(image);
        message.channel.send({ embeds: [embed] });
    }
};
