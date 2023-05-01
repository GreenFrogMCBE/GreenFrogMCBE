const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class MangroveStairs extends Block {
	getRuntimeId() {
		return 6443;
	}

	getName() {
		return "mangrove_stairs";
	}
}

module.exports = MangroveStairs;
