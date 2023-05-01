const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class BrickWall extends Block {
	getRuntimeId() {
		return 4694;
	}

	getName() {
		return "brick_wall";
	}
}

module.exports = BrickWall;
