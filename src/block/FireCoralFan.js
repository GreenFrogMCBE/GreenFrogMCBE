const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class FireCoralFan extends Block {
	getRuntimeId() {
		return 5945;
	}

	getName() {
		return "fire_coral_fan";
	}
}

module.exports = FireCoralFan;
