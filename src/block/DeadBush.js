const Block = require("./Block");

/**
 * @type {import('../type/Block')}
 */
class DeadBush extends Block {
	getRuntimeId() {
		return 6909;
	}

	getName() {
		return "bush";
	}
}

module.exports = DeadBush;
