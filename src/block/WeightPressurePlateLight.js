const Block = require("./Block");

class WeightPressurePlateLight extends Block {
    getRuntimeId() {
        return 5133
    }

    getName() {
        return "weight_pressure_plate_light"
    }
}

module.exports = WeightPressurePlateLight;