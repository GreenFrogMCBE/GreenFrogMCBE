const Block = require("./Block");

class RedNetherBrickWall extends Block {
    getRuntimeId() {
        return 3394
    }

    getName() {
        return "red_nether_brick_wall"
    }
}

module.exports = RedNetherBrickWall;