const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class NetherBrickWallCrossed extends Block {
	getRuntimeId() {
		return 3026;
	}

	getName() {
		return "nether_brick_wall";
	}
}

module.exports = NetherBrickWallCrossed;
