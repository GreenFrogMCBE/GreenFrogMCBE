const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class AndesiteWall extends Block {
	getRuntimeId() {
		return 3694;
	}

	getName() {
		return "andesite_wall";
	}
}

module.exports = AndesiteWall;
