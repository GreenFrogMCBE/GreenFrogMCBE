const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class RedSandstoneWall extends Block {
	getRuntimeId() {
		return 3981;
	}

	getName() {
		return "red_sandstone_wall";
	}
}

module.exports = RedSandstoneWall;
