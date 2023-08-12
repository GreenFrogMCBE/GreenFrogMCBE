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
const fs = require("fs");
const path = require("path");

module.exports = {
	/**
	 * The array list of commands
	 *
	 * @type {any[]}
	 */
	commands: [],

	/**
	 * Loads all commands
	 */
	async loadAllCommands() {
		const Frog = require("../Frog");
		const commandsPath = path.join(__dirname, "..", "commands");

		fs.readdir(commandsPath, (err, files) => {
			for (const file of files) {
				const filePath = path.join(commandsPath, file);
				const stats = fs.statSync(filePath);

				if (!stats.isFile()) {
					continue;
				}

				const command = require(filePath);
				const commandClass = new command();

				if (commandClass.name) {
					this.commands.push(commandClass);
				}
			}

			Frog.eventEmitter.emit("serverCommandsInitialize");
		});
	},
};
