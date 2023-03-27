const Block = require("./Block");

class PrismarineWall extends Block {
    getRuntimeId() {
        return 3224
    }

    getName() {
        return "prismarine_wall"
    }
}

module.exports = PrismarineWall;