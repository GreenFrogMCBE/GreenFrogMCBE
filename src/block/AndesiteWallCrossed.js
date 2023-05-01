const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class AndesiteWallCrossed extends Block {
	getRuntimeId() {
		return 3357;
	}

	getName() {
		return "andesite_wall";
	}
}

module.exports = AndesiteWallCrossed;
