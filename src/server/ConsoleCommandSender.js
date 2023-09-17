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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const readline = require("readline");

const Logger = require("../utils/Logger");
const CommandManager = require("./CommandManager");

const Language = require("../utils/Language");
const CommandVerifier = require("../utils/CommandVerifier");

/** @type {boolean} */
let isClosed = false;
/** @type {import("readline").ReadLine | undefined} */
let readLineInterface;

module.exports = {
	/**
	 * Closes the console.
	 */
	closeConsole() {
		isClosed = true;
	},

	/**
	 * Set ups the console command reader that is used to handle commands
	 */
	async setupConsoleReader() {
		readLineInterface = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readLineInterface.setPrompt("");
		readLineInterface.prompt(true);
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
	 * @type {import("readline").ReadLine | undefined}
	 */
	readLineInterface,

	/**
	 * Executes a command that the user types in the console.
	 *
	 * @param {string} command
	 */
	executeCommand(command) {
		command = command.replace("/", "");

		const args = command?.split(" ")?.slice(1);
		const Frog = require("../Frog");

		let shouldExecuteCommand = true;

		Frog.eventEmitter.emit("serverCommand", {
			args,
			command,
			cancel() {
				shouldExecuteCommand = false;
			},
		});

		if (isClosed || !shouldExecuteCommand || !command.replace(" ", "")) return;

		try {
			let commandFound = false;

			for (const loadedCommand of CommandManager.commands) {
				if (loadedCommand.name === command.split(" ")[0] || (loadedCommand.aliases && loadedCommand.aliases.includes(command.split(" ")[0]))) {
					if (loadedCommand.minArgs !== undefined && loadedCommand.minArgs > args.length) {
						Logger.info(Language.getKey("commands.errors.syntaxError.minArg").replace("%s", loadedCommand.minArgs).replace("%d", args.length.toString()));
						return;
					}

					if (loadedCommand.maxArgs !== undefined && loadedCommand.maxArgs < args.length) {
						Logger.info(Language.getKey("commands.errors.syntaxError.maxArg").replace("%s", loadedCommand.maxArgs).replace("%d", args.length.toString()));
						return;
					}

					loadedCommand.execute(
						{
							username: "Server",
							network: {
								address: Frog.config.network.host,
								port: Frog.config.network.port,
							},
							permissions: {
								op: true,
								isConsole: true,
							},
							sendMessage: (message) => {
								Logger.info(message);
							},
						},
						Frog,
						args,
					);

					commandFound = true;
					break;
				}
			}

			if (!commandFound) {
				CommandVerifier.throwError(
					{
						sendMessage: (msg) => {
							Logger.info(msg);
						},
					},
					command.split(" ")[0],
				);
			}
		} catch (error) {
			Frog.eventEmitter.emit("serverCommandProcessError", {
				command,
				error,
			});

			Logger.error(Language.getKey("commands.errors.internalError").replace("%s", error.stack));
		}
	},

	/**
	 * Checks if the command is empty
	 *
	 * @param {string} command
	 */
	isEmptyCommand(command) {
		return !command.replace("/", "").trim();
	},

	/**
	 * Starts the console.
	 */
	async startConsole() {
		const Frog = require("../Frog");

		await this.setupConsoleReader();
		await CommandManager.loadAllCommands();

		if (!readLineInterface) return;

		readLineInterface.on("line", async (command) => {
			if (this.isEmptyCommand(command)) return;

			let shouldProcessCommand = true;

			Frog.eventEmitter.emit("serverCommandProcess", {
				command,
				cancel: () => {
					shouldProcessCommand = false;
				},
			});

			if (shouldProcessCommand) {
				this.executeCommand(command);

				if (!isClosed && readLineInterface) readLineInterface.prompt(true);
			}
		});
	},
};
