const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class CrimsonTrapdoor extends Block {
	getRuntimeId() {
		return 6195;
	}

	getName() {
		return "crimson_trapdoor";
	}
}

module.exports = CrimsonTrapdoor;
