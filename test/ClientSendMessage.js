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
		let bot = bedrock.createClient({
			host: "127.0.0.1",
			port: 19132,
			username: "sendmessagebot",
			offline: true,
			version: "1.19.70",
		});

		console.log("[sendmessage bot] joined");
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
