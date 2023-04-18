const readline = require("readline");

const ConsoleSetupException = require("../utils/exceptions/ConsoleSetupException");

const Logger = require("./Logger");
const Frog = require("../Frog");
const Commands = require("./Commands");

let isClosed = false;
/** @private */
let lang;
/** @private */
let readLineInterface;

/**
 * Set ups the console command reader that is used to handle commands
 * 
 * @throws {ConsoleSetupException} - If the console is closed
 * @async
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
 * @param {string} input - The command to execute.
 * @throws {CommandHandlingException} Throws an error if the command cannot be executed.
 */
async function executeConsoleCommand(input) {
	if (isClosed) return;

	let shouldExecCommand = true

	const args = input.split(" ").slice(1);

	require("../Frog").eventEmitter.emit('serverExecutedCommand', {
		server: require("../Frog").server,
		args,
		command: input,
		cancel() {
			shouldExecCommand = false
		}
	})

	if (!shouldExecCommand) return

	try {
		if (!input.replace(" ", "")) return;

		let commandFound = false;

		for (const command of Commands.commandList) {
			if (
				command.data.name === input.split(" ")[0] ||
				(command.data.aliases && command.data.aliases.includes(input.split(" ")[0]))
			) {
				if (
					command.data.minArgs !== undefined &&
					command.data.minArgs > args.length
				) {
					Logger.info(
						lang.commands.minArg
							.replace("%m%", command.data.minArgs)
							.replace("%r%", args.length)
					);
					return;
				}

				if (
					command.data.maxArgs !== undefined &&
					command.data.maxArgs < args.length
				) {
					Logger.info(
						lang.commands.maxArg
							.replace("%m%", command.data.maxArgs)
							.replace("%r%", args.length)
					);
					return;
				}

				command.execute(
					Frog,
					{
						sendMessage: (message) => {
							Logger.info(message);
						},
						// eslint-disable-next-line no-unused-vars
						setGamemode: (gamemode) => {},
						op: true,
						username: "Server",
						ip: "127.0.0.1",
						isConsole: true,
					},
					args
				);

				commandFound = true;
				break; // Exit loop once command has been found and executed
			}
		}

		if (!commandFound) {
			Logger.info(
				lang.errors.unknownCommandOrNoPermission.replace(
					"%commandname%",
					input.split(" ")[0]
				)
			);
		}
	} catch (error) {
		Logger.error(`Failed to execute command from Server. Error: ${error.stack}`);
	}
}

module.exports = {
	/**
	 * Closes the console.
	 * 
	 * @throws {ConsoleSetupException} - If the console is already closed
	 */
	close() {
		if (isClosed) {
			throw new ConsoleSetupException("Console is already closed!");
		}

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

		await setupConsoleReader();

		await Commands.loadAllCommands()

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
					require("../Frog").eventEmitter.emit('serverCommandProcessError', {
						server: require("../Frog").server,
						command,
						error
					});

					Logger.error(`Failed to execute command! ${error.stack}`);
				}
			}
		});
	},
};
