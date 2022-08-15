"use strict";

const { Client, Collection, Permissions, LimitedCollection } = require("discord.js"),
  Util = require("./Util.js");

module.exports = class CrimsonClient extends Client {
  constructor(options = {}) {
    super({
      messageCacheLifetime: 60,
      fetchAllMembers: true,
      messageCacheMaxSize: 10,
      restTimeOffset: 0,
      restWsBridgetimeout: 100,
      shards: "auto",
      allowedMentions: {
        parse: [
          "roles",
          "users",
          "everyone"
        ],
        repliedUser: true,
      },
      partials: [
        "MESSAGE",
        "CHANNEL",
        "REACTION",
        "GUILD_MEMBER",
        "USER",
        "VOICE"
      ],
      intents: 32767,
      makeCache: manager => {
        if (manager.name === 'MessageManager') return new LimitedCollection({ maxSize: 1500 });
        return new Collection();
      },
    });

    this.validate(options);
    this.aliases = new Collection();
    this.commands = new Collection();
    this.events = new Collection();
    this.logger = require("./logger");
    this.owners = options.owners;
    this.utils = new Util(this);

  }

  validate(options) {
    if (typeof options !== "object")
      throw new TypeError("Options should be a type of Object.");

    if (!options.token)
      throw new Error("You must pass the token for the client.");
    this.token = options.token;

    if (!options.prefix)
      throw new Error("You must pass a prefix for the client.");
    if (typeof options.prefix !== "string")
      throw new TypeError("Prefix should be a type of String.");
    this.prefix = options.prefix;

    if (!options.defaultPerms)
      throw new Error("You must pass default perm(s) for the Client.");
    this.defaultPerms = new Permissions(options.defaultPerms).freeze();
  }

  async start(token = this.token) {
    this.utils.loadCommands();
    this.utils.loadEvents();

    await super.login(token);
  }
};
