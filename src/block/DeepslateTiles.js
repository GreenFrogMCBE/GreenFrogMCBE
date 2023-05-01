const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class DeepslateTiles extends Block {
	getRuntimeId() {
		return 6429;
	}

	getName() {
		return "deepslate_tiles";
	}
}

module.exports = DeepslateTiles;
