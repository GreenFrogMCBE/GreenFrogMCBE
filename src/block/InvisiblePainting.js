const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class InvisiblePainting extends Block {
	getRuntimeId() {
		return 6294;
	}

	getName() {
		return "invisible_painting";
	}
}

module.exports = InvisiblePainting;
