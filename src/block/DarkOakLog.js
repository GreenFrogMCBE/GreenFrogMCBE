const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class DarkOakLog extends Block {
	getRuntimeId() {
		return 5679;
	}

	getName() {
		return "dark_oak_log";
	}
}

module.exports = DarkOakLog;
