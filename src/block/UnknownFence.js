const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class UnknownFence extends Block {
	getRuntimeId() {
		return 7691;
	}

	getName() {
		return "unknown_fence";
	}
}

module.exports = UnknownFence;
