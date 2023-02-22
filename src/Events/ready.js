"use strict";

const Event = require("../Structures/Event")

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
    });
  }

  async run() {
    const client = this.client,
      bot = client


    //shard error handling 
    this.client.once('shardError', (error) => {
      this.client.logger.error('A websocket connection encountered an error:', error);
    });

    const activities = [
      `${this.client.guilds.cache.size.toLocaleString()} servers!`,
      `${this.client.channels.cache.size.toLocaleString()} channels!`,
      `${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users!`,
    ];

    let i = 0;
    setInterval(() => this.client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000);

    this.client.logger.log([
      `Logged in as: ${this.client.user.tag} (${this.client.user.id})`,
      `Loaded: ${this.client.commands.size.toLocaleString()} commands, ${this.client.aliases.size.toLocaleString()} aliases, ${this.client.events.size.toLocaleString()} events`,
      `Serving: ${this.client.users.cache.size.toLocaleString()} members, ${this.client.guilds.cache.size.toLocaleString()} guilds`,
      `Received: ${this.client.guilds.cache.reduce((a, b) => a + b.roles.cache.size, 0)} roles, ${this.client.users.cache.size.toLocaleString()} Members, ${this.client.guilds.cache.size.toLocaleString()} guilds, ${this.client.channels.cache.size.toLocaleString()} channels from cache`,
      `Owner ID: ${this.client.owners.join(", ")}`,
      `Invite: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`
    ].join("\n"));

    this.client.logger.log(`\nServers[${this.client.guilds.cache.size.toLocaleString()}]: \n---------\n${this.client.guilds.cache.map((guild) => `${guild.id + "\t" + guild.name + "   |   " + guild.memberCount.toLocaleString()} mem\'s`).join("\n")}`);

    process.on("unhandledRejection", (err) => client.logger.error(err.stack));

  }
}