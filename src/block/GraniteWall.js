const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class GraniteWall extends Block {
	getRuntimeId() {
		return 3035;
	}

	getName() {
		return "granite_wall";
	}
}

module.exports = GraniteWall;
