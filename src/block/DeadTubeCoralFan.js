const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class DeadTubeCoralFan extends Block {
	getRuntimeId() {
		return 5071;
	}

	getName() {
		return "dead_tube_coral_fan";
	}
}

module.exports = DeadTubeCoralFan;
