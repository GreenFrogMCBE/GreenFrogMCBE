const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class HangingSign extends Block {
	getRuntimeId() {
		return 5215;
	}

	getName() {
		return "hanging_sign";
	}
}

module.exports = HangingSign;
