const Text = require("../../network/packets/Text");
const Logger = require("../Logger");

module.exports = {
	/**
	 *
	 * @param {import('../../../types/Server')} server
	 */
	runAsConsole() {
		Logger.log("Hello.", "info");
	},

	run(_server, player) {
		const text = new Text();
		text.setMessage("Hello.");
		text.setNeedsTranslation(false);
		text.setPlatformChatId("");
		text.setSourceName("");
		text.setType("chat");
		text.setXuid("");
		text.send(player);
	},

	/**
	 * @type {import('../../base/Command').Options}
	 */
	data: {
		name: "test",
		description: "Test command.",
	},
};
