const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class StrippedJungleLog extends Block {
	getRuntimeId() {
		return 4194;
	}

	getName() {
		return "stripped_jungle_log";
	}
}

module.exports = StrippedJungleLog;
