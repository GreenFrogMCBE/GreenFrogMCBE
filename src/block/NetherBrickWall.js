const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class NetherBrickWall extends Block {
	getRuntimeId() {
		return 3362;
	}

	getName() {
		return "nether_brick_wall";
	}
}

module.exports = NetherBrickWall;
