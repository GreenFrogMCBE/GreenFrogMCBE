const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class BlueCandle extends Block {
	getRuntimeId() {
		return 0;
	}

	getName() {
		return "blue_candle";
	}
}

module.exports = BlueCandle;
