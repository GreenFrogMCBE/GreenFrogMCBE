const Block = require("./Block");

class CobbleStoneWall2 extends Block {
    getRuntimeId() {
        return 3731
    }

    getName() {
        return "cobble_stone_wall"
    }
}

module.exports = CobbleStoneWall2;