const Block = require("./Block");

class CobbleStoneWall extends Block {
    getRuntimeId() {
        return 3373
    }

    getName() {
        return "cobblestone_wall"
    }
}

module.exports = CobbleStoneWall;