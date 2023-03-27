const Block = require("./Block");

class RedstoneWire extends Block {
    getRuntimeId() {
        return 5259
    }

    getName() {
        return "redstone_wire"
    }
}

module.exports = RedstoneWire;