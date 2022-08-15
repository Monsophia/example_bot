"use strict";

const Command = require("../../Structures/Command"),
    { exec } = require("child_process")


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'exec',
            aliases: ['bash'],
            category: "Owner",
            ownerOnly: true,
        });
    }

    async run(message, args) {
        const stuff = args.join(" ")

        if (!stuff) {
            return message.channel.send({ content: `please add something to execute` })
        }

        exec(stuff, (error, stdout) => {
            const response = stdout || error;
            message.channel.send({ content: `\`\`\`js\n${response}\`\`\``, split: true, code: 'js' })
        })
    }
};