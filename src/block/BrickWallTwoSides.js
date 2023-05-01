const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class BrickWallTwoSides extends Block {
	getRuntimeId() {
		return 3065;
	}

	getName() {
		return "brick_wall";
	}
}

module.exports = BrickWallTwoSides;
