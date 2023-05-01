const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class StoneBrickWall extends Block {
	getRuntimeId() {
		return 2856;
	}

	getName() {
		return "stone_brick_wall";
	}
}

module.exports = StoneBrickWall;
