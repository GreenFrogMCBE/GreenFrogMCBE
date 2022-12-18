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

    ValidateCommands() {
        try {
            require("../../commands.json")
        } catch (e) {
            Logger.prototype.log(Lang.failedfindcommands.replace('%e%', e))
            process.exit(-1)
        }

        try {
            JSON.parse(JSON.stringify(require("../../commands.json")))            
        } catch (e) {
            Logger.prototype.log(Lang.failedparsecommands.replace('%e%', e))
            process.exit(-1)
        }
    }

    ValidateLangFile() {
        try {
            require("../../src/lang/lt_LT.json")
            require("../../src/lang/uk_UA.json")
            require("../../src/lang/en_US.json")
        } catch (e) {
            Logger.prototype.log(Lang.failedparselang.replace('%e%', e))
            process.exit(-1)
        }

        try {
            JSON.parse(JSON.stringify(require("../../src/lang/lt_LT.json")))
            JSON.parse(JSON.stringify(require("../../src/lang/uk_UA.json")))
            JSON.parse(JSON.stringify(require("../../src/lang/en_US.json")))
        } catch (e) {
            Logger.prototype.log(Lang.failedfindlang.replace('%e%', e))
            process.exit(-1)
        }
    }
}

module.exports = ValidateConfig;
