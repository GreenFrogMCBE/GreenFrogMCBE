const Block = require("./Block");

class HangingSign extends Block {
    getRuntimeId() {
        return 5215
    }

    getName() {
        return "hanging_sign"
    }
}

module.exports = HangingSign;