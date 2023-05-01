const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class FireCoralFan extends Block {
	getRuntimeId() {
		return 3270;
	}

	getName() {
		return "mossy_stone_wall";
	}
}

module.exports = FireCoralFan;
