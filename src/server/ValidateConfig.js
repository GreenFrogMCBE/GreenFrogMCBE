const Logger = require('../console/Logger')

class ValidateConfig {
    constructor() {}

    ValidateConfig() {
        try {
            require("../../config.json")
        } catch (e) {
            Logger.prototype.log(`Failed to find config.json | Error: ${e}`)
            process.exit(-1)
        }

        try {
            JSON.parse(JSON.stringify(require("../../config.json")))            
        } catch (e) {
            Logger.prototype.log(`Failed to parse config.json | Error: ${e}`)
            process.exit(-1)
        }
    }

    ValidateLangFile() {
        try {
            require("../../lang.json")
        } catch (e) {
            Logger.prototype.log(`Failed to find lang.json | Error: ${e}`)
            process.exit(-1)
        }

        try {
            JSON.parse(JSON.stringify(require("../../lang.json")))
        } catch (e) {
            Logger.prototype.log(`Failed to parse lang.json | Error: ${e}`)
            process.exit(-1)
        }
    }
}

module.exports = ValidateConfig;
