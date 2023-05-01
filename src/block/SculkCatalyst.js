const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class SculkCatalyst extends Block {
	getRuntimeId() {
		return 5072;
	}

	getName() {
		return "sculk_catalyst";
	}
}

module.exports = SculkCatalyst;
