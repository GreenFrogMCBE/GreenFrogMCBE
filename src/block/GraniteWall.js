const Block = require("./Block");

class GraniteWall extends Block {
    getRuntimeId() {
        return 3035
    }

    getName() {
        return "granite_wall"
    }
}

module.exports = GraniteWall;