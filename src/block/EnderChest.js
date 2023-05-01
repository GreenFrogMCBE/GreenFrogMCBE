const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class EnderChest extends Block {
	getRuntimeId() {
		return 6221;
	}

	getName() {
		return "ender_chest";
	}
}

module.exports = EnderChest;
