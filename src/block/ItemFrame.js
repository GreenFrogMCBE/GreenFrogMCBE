const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class ItemFrame extends Block {
	getRuntimeId() {
		return 6110;
	}

	getName() {
		return "item_frame";
	}
}

module.exports = ItemFrame;
