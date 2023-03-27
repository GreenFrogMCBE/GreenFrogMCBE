const Block = require("./Block");

class PrismarineWall2 extends Block {
    getRuntimeId() {
        return 4064
    }

    getName() {
        return "prismarine_wall2"
    }
}

module.exports = PrismarineWall2;