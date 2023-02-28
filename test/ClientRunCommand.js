/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
const bedrock = require("frog-protocol");

module.exports = {
  async test() {
    await console.log("[client] joining...");
    let Bot = bedrock.createClient({
      host: "127.0.0.1",
      port: 19132,
      username: "bot",
      offline: true,
      version: "1.19.63",
    });

    console.log("[client] joined");
    Bot.on("spawn", () => {
      Bot.queue("command_request", {
        command: '/pl',
        internal: false,
        version: 52,
        origin: {
          uuid: Bot.profile.uuid,
          request_id: Bot.profile.uuid,
          type: 'player',
        },
      });
    });
  },
};
