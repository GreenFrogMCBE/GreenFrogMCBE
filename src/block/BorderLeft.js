const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class BorderLeft extends Block {
	getRuntimeId() {
		return 7660;
	}

	getName() {
		return "border";
	}
}

module.exports = BorderLeft;
