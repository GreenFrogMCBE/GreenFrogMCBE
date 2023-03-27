const Block = require("./Block");

class Rail extends Block {
    getRuntimeId() {
        return 5772
    }

    getName() {
        return "rail"
    }
}

module.exports = Rail;