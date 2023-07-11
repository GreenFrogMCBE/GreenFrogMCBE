/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/kotinash/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const readline = require("readline");

const Logger = require("./Logger");
const Commands = require("./Commands");

const Language = require("../utils/Language");

const CommandVerifier = require("../utils/CommandVerifier");

/** @private */
let isClosed = false;
/** @private */
let readLineInterface;

/**
 * Set ups the console command reader that is used to handle commands
 */
async function setupConsoleReader() {
	readLineInterface = await readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	readLineInterface.setPrompt("");
	readLineInterface.prompt(true);
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
	 * @returns {boolean}
	 */
	isClosed,

	/**
	 * Returns the command handler interface.
	 *
	 * @type {readline.Interface}
	 */
	readLineInterface,

	/**
	 * Executes a command that the user typed in the console.
	 *
	 * @param {string} executedCommand - The command to execute.
	 */
	executeConsoleCommand(executedCommand) {
		executedCommand = executedCommand.replace("/", "");

		let shouldExecCommand = true;

		const args = executedCommand.split(" ").slice(1);

		const Frog = require("../Frog")
		Frog.eventEmitter.emit("serverExecutedCommand", {
			args,
			command: executedCommand,
			cancel: () => {
				shouldExecCommand = false;
			},
		});

		if (isClosed || !shouldExecCommand || !executedCommand.replace(" ", "")) return;

		try {
			let commandFound = false;

			for (const command of Commands.commandList) {
				if (command.data.name === executedCommand.split(" ")[0] || (command.data.aliases && command.data.aliases.includes(executedCommand.split(" ")[0]))) {
					if (command.data.minArgs !== undefined && command.data.minArgs > args.length) {
						Logger.info(Language.getKey("commands.errors.syntaxError.minArg").replace("%s%", command.data.minArgs).replace("%d%", args.length));
						return;
					}

					if (command.data.maxArgs !== undefined && command.data.maxArgs < args.length) {
						Logger.info(Language.getKey("commands.errors.syntaxError.maxArg").replace("%s%", command.data.maxArgs).replace("%d%", args.length));
						return;
					}

					command.execute(
						Frog,
						{
							sendMessage: (message) => {
								Logger.info(message);
							},
							setGamemode: () => { },
							op: true,
							username: "Server",
							ip: "127.0.0.1",
							isConsole: true,
						},
						args,
					);

					commandFound = true;
					break; // Exit loop once command has been found and executed
				}
			}

			if (!commandFound) {
				CommandVerifier.throwError(
					{
						sendMessage: (msg) => {
							Logger.info(msg);
						},
					},
					executedCommand.split(" ")[0],
				);
			}
		} catch (error) {
			require("../Frog").eventEmitter.emit("serverCommandProcessError", {
				command: executedCommand,
				error,
			});

			Logger.error(Language.getKey("commands.errors.internalError").replace("%s%", error.stack));
		}
	},

	/**
	 * Checks if the command is empty
	 *
	 * @param {string} command
	 */
	isEmpty(command) {
		return !command.replace("/", "").trim();
	},

	/**
	 * Starts the console.
	 */
	async start() {
		const Frog = require("../Frog")

		await setupConsoleReader();
		await Commands.loadAllCommands();

		readLineInterface.on("line", async (command) => {
			if (this.isEmpty(command)) return;

			let shouldProcessCommand = true;

			Frog.eventEmitter.emit("serverCommandProcess", {
				command,
				cancel: () => {
					shouldProcessCommand = false;
				},
			});

			if (shouldProcessCommand) {
				this.executeConsoleCommand(command);

				if (!isClosed) readLineInterface.prompt(true);
			}
		});
	},
};
