const Block = require("./Block");

class Air extends Block {
    getRuntimeId() {
        return 0
    }

    getName() {
        return "air"
    }
}

module.exports = Air;