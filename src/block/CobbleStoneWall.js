const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class CobbleStoneWall extends Block {
	getRuntimeId() {
		return 3373;
	}

	getName() {
		return "cobblestone_wall";
	}
}

module.exports = CobbleStoneWall;
