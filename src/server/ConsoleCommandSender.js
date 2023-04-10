const { readdir } = require("fs/promises");
const readline = require("readline");
const Logger = require("./Logger");

let isClosed = false;
/** @private */
let lang;
let readLineInterface;

module.exports = {
	/**
	 * Closes the console.
	 */
	close() {
		isClosed = true;
	},

	/**
	 * Returns true if the console is closed, false otherwise.
	 * 
	 * @returns {Boolean}
	 */
	isClosed,

	/**
	 * Returns the command handler interface.
	 * 
	 * @type {readline.Interface}
	 */
	readLineInterface,

	/**
	 * Starts the console.
	 */
	async start() {
		lang = require("../Frog").serverConfigurationFiles.lang;

		readLineInterface = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readLineInterface.setPrompt("");
		readLineInterface.prompt(true);

		readLineInterface.on("line", async (input) => {
			let shouldProcessCommand = true;

			require("../Frog").eventEmitter.emit("serverCommandProcess", {
				server: require("../Frog").server,
				command: input,
				cancel() {
					shouldProcessCommand = false;
				}
			});

			if (shouldProcessCommand) {
				try {
					const commandFilenames = await readdir("./src/commands");
					const commandName = input.split(" ")[0];
					const commandArgs = input.split(" ").slice(1);

					if (!commandName.replace(" ", "")) return;

					let commandFound = false;

					for (const commandFilename of commandFilenames) {
						if (commandFilename.endsWith(".js")) {
							const command = require(`../commands/${commandFilename}`);

							if (command.data.name === commandName || (command.data.aliases && command.data.aliases.includes(commandName))) {
								if (command.data.minArgs !== undefined && command.data.minArgs > commandArgs.length) {
									Logger.info(lang.commands.minArg.replace("%m%", command.data.minArgs).replace("%r%", commandArgs.length));
									return;
								}

								if (command.data.maxArgs !== undefined && command.data.maxArgs < commandArgs.length) {
									Logger.info(lang.commands.maxArg.replace("%m%", command.data.maxArgs).replace("%r%", commandArgs.length));
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
									commandArgs
								);

								commandFound = true;
							}
						}
					}

					if (!commandFound) {
						Logger.info(lang.errors.unknownCommandOrNoPermission.replace("%commandname%", commandName));
					}
				} catch (error) {
					Logger.error(`Failed to execute command! ${error.stack}`);
				}
			}

			if (!isClosed) readLineInterface.prompt(true);
		});
	},
};
