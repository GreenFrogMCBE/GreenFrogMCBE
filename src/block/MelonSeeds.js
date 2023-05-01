const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class MelonSeeds extends Block {
	getRuntimeId() {
		return 7454;
	}

	getName() {
		return "melon_seeds";
	}
}

module.exports = MelonSeeds;
