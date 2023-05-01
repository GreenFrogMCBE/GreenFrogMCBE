const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class StrippedMangroveLog extends Block {
	getRuntimeId() {
		return 5965;
	}

	getName() {
		return "stripped_mangrove_log";
	}
}

module.exports = StrippedMangroveLog;
