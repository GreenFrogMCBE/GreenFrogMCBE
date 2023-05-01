const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class Rail extends Block {
	getRuntimeId() {
		return 5772;
	}

	getName() {
		return "rail";
	}
}

module.exports = Rail;
