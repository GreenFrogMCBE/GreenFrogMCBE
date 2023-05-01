const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class AndesiteWallRight extends Block {
	getRuntimeId() {
		return 3917;
	}

	getName() {
		return "andesite_wall";
	}
}

module.exports = AndesiteWallRight;
