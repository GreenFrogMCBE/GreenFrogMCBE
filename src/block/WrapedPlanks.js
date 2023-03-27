const Block = require("./Block");

class WrapedPlanks extends Block {
    getRuntimeId() {
        return 3671
    }

    getName() {
        return "wraped_planks"
    }
}

module.exports = WrapedPlanks;