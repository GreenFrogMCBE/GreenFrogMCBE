const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class PrismarineWall extends Block {
	getRuntimeId() {
		return 3224;
	}

	getName() {
		return "prismarine_wall";
	}
}

module.exports = PrismarineWall;
