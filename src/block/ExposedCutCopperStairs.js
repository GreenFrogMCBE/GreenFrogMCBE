const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class ExposedCutCopperStairs extends Block {
	getRuntimeId() {
		return 5751;
	}

	getName() {
		return "exposed_cut_copper_stairs";
	}
}

module.exports = ExposedCutCopperStairs;
