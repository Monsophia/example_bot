"use strict";

const Event = require("../Structures/Event"),
  { MessageEmbed } = require("discord.js")

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
    });
  }

  async run() {
    const client = this.client,
      bot = client

    // client.on("messageDelete", async (message) => {
    //   if (message.author.bot) return

    //   const c = '993646280108675142'

    //   const s = client.channels.cache.get(c)

    //   const embed = new MessageEmbed()
    //     .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))

    //     .addField(`A message was deleted`, [
    //       `Author: ${message.author.tag} | ${message.author.id}`,
    //       `Message deleted: ${message.content}`,
    //       `Channel: ${message.channel.name} | ${message.channel.id}`
    //     ].join("\n"))
    //   s.send({ embeds: [embed] })
    // })

    // client.on('messageUpdate', (oldMessage, newMessage) => {
    //   if (oldMessage.author.bot) return


    //   const c = '993646280108675142'

    //   const s = client.channels.cache.get(c)

    //   const embed = new MessageEmbed()
    //     .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
    //     .addField(`A message was updated`, [
    //       `Author: ${oldMessage.author.tag} | ${oldMessage.author.id}`,
    //       `before: ${oldMessage.content}`,
    //       `After: ${newMessage.content}`,
    //       `Channel: ${oldMessage.channel.name} | ${oldMessage.channel.id}`
    //     ].join("\n"))
    //   s.send({ embeds: [embed] })
    // });


    client.on("guildMemberAdd", async (member) => {
      if (member.guild.id !== '993646277059424326') return

      const role = member.guild.roles.cache.get("993646277113946207")
      member.roles.add(role)

      const neededChannel = '993646277650813008'
      const c = client.channels.cache.get(neededChannel)
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .addField(`New member has joined`, [
          `Welcome ${member.user.tag} | (${member.user.id}) to ${member.guild.name}`
        ].join("\n"))

      c.send({ embeds: [embed] })
    })

    client.on("guildMemberRemove", async (member) => {
      if (member.guild.id !== '993646277059424326') return


      const neededChannel = '996833224376459377'
      const c = client.channels.cache.get(neededChannel)
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .addField(`A user has left`, [
          `goodbye ${member.user.tag} | (${member.user.id}) Hope you enjoyed your stay here`
        ].join("\n"))

      c.send({ embeds: [embed] })
    })


    //shard error handling 
    this.client.once('shardError', (error) => {
      this.client.logger.error('A websocket connection encountered an error:', error);
    });

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