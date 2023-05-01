const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class CrackedStoneBricks extends Block {
	getRuntimeId() {
		return 5992;
	}

	getName() {
		return "cracked_stone_bricks";
	}
}

module.exports = CrackedStoneBricks;
