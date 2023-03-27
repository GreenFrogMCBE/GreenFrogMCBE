const Block = require("./Block");

class SmothQuartzBlock extends Block {
    getRuntimeId() {
        return 5162
    }

    getName() {
        return "smoth_quartz_block"
    }
}

module.exports = SmothQuartzBlock;