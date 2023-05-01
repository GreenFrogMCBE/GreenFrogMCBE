const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class Air extends Block {
	getRuntimeId() {
		return -1;
	}

	getName() {
		return "air";
	}
}

module.exports = Air;
