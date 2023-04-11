const { readdir } = require("fs/promises");
const readline = require("readline");

const ConsoleSetupException = require("../utils/exceptions/ConsoleSetupException");
const CommandHandlingException = require("../utils/exceptions/CommandHandlingException");

const Logger = require("./Logger");

let isClosed = false;
/** @private */
let lang;
let readLineInterface;

/**
 * Set ups the console command reader that is used to handle commands
 * 
 * @throws {ConsoleSetupException} - If the console is closed
 */
async function setupConsoleReader() {
	if (isClosed) {
		throw new ConsoleSetupException("Console is closed!")
	}

	readLineInterface = await readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	readLineInterface.setPrompt("");
	readLineInterface.prompt(true);
}

/**
 * Executes a command that the user typed in the console.
 *
 * @async
 * @param {String} command - The command to execute.
 * @throws {CommandHandlingException} Throws an error if the command cannot be executed.
 */
async function executeConsoleCommand(command) {
	if (isClosed) return;

	try {
		const commandFilenames = await readdir("./src/commands");
		const commandName = command.split(" ")[0];
		const commandArgs = command.split(" ").slice(1);

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
					}, commandArgs);

					commandFound = true;
				}
			}
		}

		if (!commandFound) {
			Logger.info(lang.errors.unknownCommandOrNoPermission.replace("%commandname%", commandName));
		}
	} catch (e) {
		throw CommandHandlingException(e)
	}
}

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
	 * 
	 * @async
	 */
	async start() {
		lang = require("../Frog").serverConfigurationFiles.lang;

		setupConsoleReader()

		readLineInterface.on("line", async (command) => {
			let shouldProcessCommand = true;

			require("../Frog").eventEmitter.emit("serverCommandProcess", {
				server: require("../Frog").server,
				command,
				cancel() {
					shouldProcessCommand = false;
				}
			});

			if (shouldProcessCommand) {
				try {
					executeConsoleCommand(command)

					if (!isClosed) readLineInterface.prompt(true);
				} catch (error) {
					Logger.error(`Failed to execute command! ${error.stack}`);
				}
			}
		});
	},
};
