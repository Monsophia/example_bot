"use strict";

const Command = require("../../Structures/Command"),
    { uuid4 } = require("@sentry/utils")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "password",
            category: "Owner",
            ownerOnly: true
        });
    }
    // eslint-disable-next-line no-unused-vars

    async run(message) {
        message.channel.send({ content: `${uuid4()}` })
    }
};
