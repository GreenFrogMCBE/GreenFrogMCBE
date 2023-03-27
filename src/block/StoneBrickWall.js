const Block = require("./Block");

class StoneBrickWall extends Block {
    getRuntimeId() {
        return 2856
    }

    getName() {
        return "stone_brick_wall"
    }
}

module.exports = StoneBrickWall;