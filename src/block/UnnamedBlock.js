const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class UnnamedBlock extends Block {
	getRuntimeId() {
		return 7903;
	}

	getName() {
		return "unnamed_block";
	}
}

module.exports = UnnamedBlock;
