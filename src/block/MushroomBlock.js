const Block = require("./Block");

class MushroomBlock extends Block {
    getRuntimeId() {
        return 5060
    }

    getName() {
        return "mushroom_block"
    }
}

module.exports = MushroomBlock;