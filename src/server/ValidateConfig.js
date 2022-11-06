const Logger = require('../console/Logger')
const Lang = require('../api/ServerInfo')

class ValidateConfig {
    constructor() {}

    ValidateConfig() {
        try {
            require("../../config.json")
        } catch (e) {
            Logger.prototype.log(lang.failedfindconfig.replace('%e%', e))
            process.exit(-1)
        }

        try {
            JSON.parse(JSON.stringify(require("../../config.json")))            
        } catch (e) {
            Logger.prototype.log(lang.failedparseconfig.replace('%e%', e))
            process.exit(-1)
        }
    }

    ValidateLangFile() {
        try {
            require("../../lang.json")
        } catch (e) {
            Logger.prototype.log(lang.failedparselang.replace('%e%', e))
            process.exit(-1)
        }

        try {
            JSON.parse(JSON.stringify(require("../../lang.json")))
        } catch (e) {
            Logger.prototype.log(lang.failedfindlang.replace('%e%', e))
            process.exit(-1)
        }
    }
}

module.exports = ValidateConfig;
