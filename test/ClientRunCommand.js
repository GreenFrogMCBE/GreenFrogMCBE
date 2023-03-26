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
		await console.log("[commandbot] joining...");
		let bot = bedrock.createClient({
			host: "127.0.0.1",
			port: 19132,
			username: "commandbot",
			offline: true,
			version: "1.19.70",
		});

		console.log("[commandbot] joined");
		bot.on("spawn", () => {
			bot.queue("command_request", {
				command: "/pl",
				internal: false,
				version: 52,
				origin: {
					uuid: bot.profile.uuid,
					request_id: bot.profile.uuid,
					type: "player",
				},
			});
		});
	},
};
