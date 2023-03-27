const Block = require("./Block");

class Lava extends Block {
    getRuntimeId() {
        return 5171
    }

    getName() {
        return "lava"
    }
}

module.exports = Lava;