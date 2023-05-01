const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class DioriteWallCrossed extends Block {
	getRuntimeId() {
		return 3790;
	}

	getName() {
		return "diorite_wall";
	}
}

module.exports = DioriteWallCrossed;
