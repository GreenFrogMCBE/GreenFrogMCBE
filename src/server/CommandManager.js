const { readdir } = require('fs');
const path = require('path');

module.exports = {
	/** 
	 * The list of commands
	 * 
	 * @type {Array<any>} 
	 */
	commands: [],

	/**
	 * Loads all commands
	 */
	async loadAllCommands() {
		const Frog = require("../Frog");
		const commandsPath = path.join(__dirname, "..", "commands");

		readdir(commandsPath, (err, files) => {
			for (const file of files) {
				const cmd = require(path.join(commandsPath, file));
				this.commands.push(cmd);
			}

			Frog.eventEmitter.emit("serverCommandsInitialised");
		});
	}
};
