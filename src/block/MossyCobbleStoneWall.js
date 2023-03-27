const Block = require("./Block");

class MossyCobbleStoneWall extends Block {
    getRuntimeId() {
        return 3200
    }

    getName() {
        return "mossy_cobblestone_wall"
    }
}

module.exports = MossyCobbleStoneWall;