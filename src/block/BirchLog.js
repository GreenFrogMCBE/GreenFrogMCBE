const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class BirchLog extends Block {
	getRuntimeId() {
		return 4163;
	}

	getName() {
		return "birch_log";
	}
}

module.exports = BirchLog;
