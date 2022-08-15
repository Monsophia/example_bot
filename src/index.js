"use strict";

const CrimsonClient = require("./Structures/CrimsonClient"),
  config = require("../data/config.json"),
  client = new CrimsonClient(config)


client.debug = 3;

client.on("disconnect", () => client.logger.warn(`${client.user.tag} disconnected . . .`)).on("reconnecting", () => client.logger.log(`${client.user.tag} is reconnecting . . .`)).on("rateLimit", (info) => client.logger.warn(info)).on("error", (e) => client.logger.error(e.stack)).on("debug", (info) => {
  if (client.debug === 7) {
    client.logger.debug(info);
  }

  const sessions = info.match(/Remaining: (\d+)$/),
    swept = info.match(/Swept \d+ messages older than \d+ seconds in \d+ text-based channels/),
    discard = info.match(/\[WS => (Shard (\d+)|Manager)]/);


  if (sessions) {
    return client.logger.debug(`Session ${1000 - parseInt(sessions[1], 10)} of 1000`);
  }

  if (swept) {
    return client.logger.log(info);
  }

  if (discard) {
    return;
  }

  if (info.match(/\[WS => Shard \d+] (?:\[HeartbeatTimer] Sending a heartbeat\.|Heartbeat acknowledged, latency of \d+ms\.)/)) {
    return;
  }

  if (info.startsWith("429 hit on route")) {
    return;
  }

}).on("warn", (info) => client.logger.warn(info));

process.on("unhandledRejection", (err) => client.logger.error(err.stack));

client.start();
