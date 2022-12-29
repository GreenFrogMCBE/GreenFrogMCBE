const Logger = require('../console/Logger')
const ServerInfo = require('../api/ServerInfo')

const lang = ServerInfo.lang

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

    ValidateCommands() {
        try {
            require("../../commands.json")
        } catch (e) {
            Logger.prototype.log(lang.failedfindcommands.replace('%e%', e))
            process.exit(-1)
        }

        try {
            JSON.parse(JSON.stringify(require("../../commands.json")))            
        } catch (e) {
            Logger.prototype.log(lang.failedparsecommands.replace('%e%', e))
            process.exit(-1)
        }
    }

    ValidateLangFile() {
        try {
            require("../../src/lang/lt_LT.json")
            require("../../src/lang/uk_UA.json")
            require("../../src/lang/en_US.json")
        } catch (e) {
            Logger.prototype.log(lang.failedparselang.replace('%e%', e))
            process.exit(-1)
        }

        try {
            JSON.parse(JSON.stringify(require("../../src/lang/lt_LT.json")))
            JSON.parse(JSON.stringify(require("../../src/lang/uk_UA.json")))
            JSON.parse(JSON.stringify(require("../../src/lang/en_US.json")))
        } catch (e) {
            Logger.prototype.log(lang.failedfindlang.replace('%e%', e))
            process.exit(-1)
        }
    }
}

module.exports = ValidateConfig;
