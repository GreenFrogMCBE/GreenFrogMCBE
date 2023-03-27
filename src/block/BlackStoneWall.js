const Block = require("./Block");

class BlackStoneWall extends Block {
    getRuntimeId() {
        return 5341
    }

    getName() {
        return "blackstone_wall"
    }
}

module.exports = BlackStoneWall;