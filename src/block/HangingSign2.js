const Block = require("./Block");

class HangingSign2 extends Block {
    getRuntimeId() {
        return 4523
    }

    getName() {
        return "hanging_sign2"
    }
}

module.exports = HangingSign2;