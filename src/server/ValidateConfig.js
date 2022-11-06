const Logger = require('../console/Logger')
const Lang = require(`../../src/lang/${require('../../config.json').lang}.json`)

class ValidateConfig {
    constructor() {}

    ValidateConfig() {
        try {
            require("../../config.json")
        } catch (e) {
            Logger.prototype.log(Lang.failedfindconfig.replace('%e%', e))
            process.exit(-1)
        }

        try {
            JSON.parse(JSON.stringify(require("../../config.json")))            
        } catch (e) {
            Logger.prototype.log(Lang.failedparseconfig.replace('%e%', e))
            process.exit(-1)
        }
    }

    ValidateLangFile() {
        try {
            require("../../src/lang/LTU.json")
            require("../../src/lang/uk_UA.json")
            require("../../src/lang/en_US.json")
        } catch (e) {
            Logger.prototype.log(Lang.failedparselang.replace('%e%', e))
            process.exit(-1)
        }

        try {
            JSON.parse(JSON.stringify(require("../../src/lang/LTU.json")))
            JSON.parse(JSON.stringify(require("../../src/lang/uk_UA.json")))
            JSON.parse(JSON.stringify(require("../../src/lang/en_US.json")))
        } catch (e) {
            Logger.prototype.log(Lang.failedfindlang.replace('%e%', e))
            process.exit(-1)
        }
    }
}

module.exports = ValidateConfig;
