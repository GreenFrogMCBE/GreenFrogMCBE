const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class SmoothQuartzBlock extends Block {
	getRuntimeId() {
		return 5162;
	}

	getName() {
		return "smooth_quartz_block";
	}
}

module.exports = SmoothQuartzBlock;
