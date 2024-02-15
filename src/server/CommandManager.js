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
const fs = require("fs")
const path = require("path")

const {EventEmitter,Event} = require("@kotinash/better-events")

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
	async load_commands() {
		const folder_path = path.join(__dirname, "..", "commands")

		fs.readdir(folder_path, (err, files) => {
			for (const file of files) {
				const file_path = path.join(folder_path, file)
				const stats = fs.statSync(file_path)

				if (!stats.isFile()) {
					continue
				}

				const command = require(file_path)
				const command_class = new command()

				if (command_class.name) {
					this.commands.push(command_class)
				}
			}

			EventEmitter.emit(new Event("serverCommandsInitialized"))
		})
	},
}
