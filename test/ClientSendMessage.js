const protocol = require("frog-protocol");

module.exports = {
	async test() {
		console.info("[sendmessage bot] joining...");

		const bot = protocol.createClient({
			host: "127.0.0.1",
			port: 19132,
			username: "sendmessagebot",
			offline: true,
			version: "1.20.10",
		});

		console.info("[sendmessage bot] joined");

		bot.on("spawn", () => {
			bot.queue("text", {
				types: "chat",
				needs_translation: false,
				source_name: "sendmessagebot",
				xuid: "",
				platform_chat_id: "",
				message: "Hello!",
			});
		});
	},
};
