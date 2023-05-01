const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class CobbleStoneWallLeft extends Block {
	getRuntimeId() {
		return 3395;
	}

	getName() {
		return "cobblestone_wall";
	}
}

module.exports = CobbleStoneWallLeft;
