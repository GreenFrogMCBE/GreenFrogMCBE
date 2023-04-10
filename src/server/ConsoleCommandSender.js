const { readdir } = require("fs/promises");
const Logger = require("../server/Logger");
const Frog = require("../Frog");
const rl = require("readline");

const lang = Frog.serverConfigurationFiles

let isclosed = false;
let readLineInterface;

module.exports = {
	close() {
		isclosed = true;
	},

	get readLineInterface() {
		return readLineInterface;
	},

	async start() {
		readLineInterface = rl.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readLineInterface.setPrompt("");
		readLineInterface.prompt(true);

		readLineInterface.on("line", (command) => {
			let shouldProcessCommand = false;

			Frog.eventEmitter.on('serverCommandProcess', {
				server: require("../Frog").server,
				command,
				cancel() {
					shouldProcessCommand = true
				}
			})

			if (shouldProcessCommand) {
				try {
					const cmds = readdir("./src/commands");
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

			if (!isclosed) readLineInterface.prompt(true);
		})
	},
};