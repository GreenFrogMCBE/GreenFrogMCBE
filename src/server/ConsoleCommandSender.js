const rl = require("readline");
const Frog = require("../Frog");
const { readdir } = require("fs/promises");
const Logger = require("../Logger");
const lang = require("../lang");

let isclosed = false;

module.exports = {
	get isClosed() {
		return isclosed;
	},

	close() {
		isclosed = true;
	},

	async start() {
		const r = rl.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		r.setPrompt("");
		r.prompt(true);

		for await (const command of r) {
			let shouldProcessCommand = false;

			Frog.eventEmitter.on("serverCommandProcessEvent", (event) => {
				if (event.command === command) {
					event.cancel();
					shouldProcessCommand = true;
				}
			});

			if (shouldProcessCommand) {
				try {
					const cmds = await readdir("./src/commands");
					const name = command.split(" ")[0];
					const args = command.split(" ").slice(1);

					if (!name.replace(" ", "")) return;

					let exists = false;

					for (const camd of cmds) {
						if (camd.endsWith(".js")) {
							const command = require(`../commands/${camd}`);

							if (command.data.name === name || (command.data.aliases && command.data.aliases.includes(name))) {
								if (command.data.minArgs !== undefined && command.data.minArgs > args.length) {
									Logger.info(lang.commands.minArg.replace("%m%", command.data.minArgs).replace("%r%", args.length));
									return;
								}

								if (command.data.maxArgs !== undefined && command.data.maxArgs < args.length) {
									Logger.info(lang.commands.maxArg.replace("%m%", command.data.maxArgs).replace("%r%", args.length));
									return;
								}

								command.execute(this.server, {
									sendMessage: (message) => {
										Logger.info(message);
									},
									op: true,
									username: "Server",
									ip: "127.0.0.1",
									isConsole: true,
								},
									args
								);

								exists = true;
							}
						}
					}

					if (!exists) {
						Logger.info(lang.errors.unknownCommandOrNoPermission.replace("%commandname%", name));
					}
				} catch (e) {
					Logger.error("Failed to execute command! " + e.stack);
				}
			}

			if (!isclosed) r.prompt(true);
		}
	},
};