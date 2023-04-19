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
const protocol = require("frog-protocol");

module.exports = {
	async test() {
		console.info("[sendmessage bot] joining...");

		const bot = protocol.createClient({
			host: "127.0.0.1",
			port: 19132,
			username: "sendmessagebot",
			offline: true,
			version: "1.19.70",
		});

		console.info("[sendmessage bot] joined");
		bot.on("spawn", () => {
			bot.queue("text", {
				type: "chat",
				needs_translation: false,
				source_name: bot.username,
				xuid: "",
				platform_chat_id: "",
				message: `Hello!`,
			});
		});
	},
};
