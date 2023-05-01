const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class JungleWallSign extends Block {
	getRuntimeId() {
		return 6234;
	}

	getName() {
		return "jungle_wall_sign";
	}
}

module.exports = JungleWallSign;
