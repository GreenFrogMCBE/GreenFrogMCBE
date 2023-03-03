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
    await console.log("[sendmessage bot] joining...");
    let Bot = bedrock.createClient({
      host: "127.0.0.1",
      port: 19132,
      username: "sendmessagebot",
      offline: true,
      version: "1.19.63",
    });

    console.log("[sendmessage bot] joined");
    Bot.on("spawn", () => {
      Bot.queue("text", {
        type: "chat",
        needs_translation: false,
        source_name: Bot.username,
        xuid: "",
        platform_chat_id: "",
        message: `Hello!`,
      });
    });
  },
};
