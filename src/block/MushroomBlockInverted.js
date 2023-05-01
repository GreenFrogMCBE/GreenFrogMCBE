const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class MushroomBlockInverted extends Block {
	getRuntimeId() {
		return 5064;
	}

	getName() {
		return "mushroom_block";
	}
}

module.exports = MushroomBlockInverted;
