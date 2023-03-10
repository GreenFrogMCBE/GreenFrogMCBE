const Logger = require("../Logger");
const { readdir } = require("fs/promises");

module.exports = {
	async main() {
		const files = await readdir("./src/server/commands");
		const title = `Help - There are ${files.length} commands.`;
		const strings = [];

		for (const file of files) {
			/**
			 * @type {import('../../base/Command').Command}
			 */
			const command = require(`../commands/${file}`);

			strings.push(`${command.data.name} - ${command.data.description || "No description provided."}`);
		}

		return `${title}\n${strings.join("\n")}`;
	},

	/**
	 *
	 * @param {import('../../../types/Server')} server
	 */
	async runAsConsole() {
		Logger.log(await this.main(), "info");
	},

	/**
	 * @type {import('../../base/Command').Options}
	 */
	data: {
		name: "help",
		description: "Shows this message.",
		minArg: 0,
		maxArg: 0,
	},
};
