const { readdir } = require("fs/promises");
const rl = require("readline");
const Logger = require("./Logger");

let isclosed = false;
let lang;
let readLineInterface;

module.exports = {
	async close() {
		isclosed = true;
	},

	async start() {
		lang = require("../Frog").serverConfigurationFiles.lag;

		readLineInterface = rl.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readLineInterface.setPrompt("");
		readLineInterface.prompt(true);

		readLineInterface.on("line", async (command) => {
			let shouldProcessCommand = true;

			require("../Frog").eventEmitter.emit('serverCommandProcess', {
				server: require("../Frog").server,
				command,
				cancel() {
					shouldProcessCommand = false
				}
			})

			if (shouldProcessCommand) {
				try {
					const cmds = await readdir("./src/commands");
					const name = command.split(" ")[0];
					const args = command.split(" ").slice(1);

					console.log('name: ' + name)
					console.log('cmds: ' + cmds)


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
		});
	},
};
