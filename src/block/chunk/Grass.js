const Block = require("./Block");

class Grass extends Block {
    getName() {
        return "grass"
    }

    getID() {
        return 2
    }
}

module.exports = Grass;