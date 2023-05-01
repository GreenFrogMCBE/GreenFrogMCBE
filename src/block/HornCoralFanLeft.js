const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class HornCoralFanLeft extends Block {
	getRuntimeId() {
		return 5965;
	}

	getName() {
		return "horn_coral_fan";
	}
}

module.exports = HornCoralFanLeft;
