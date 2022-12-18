const config = require('../../config.json')
const colors = require('../api/Colors')
const lang = require(`../lang/${config.lang}.json`)

class Logger {
    constructor() { }

    log(message, type = 'info') {
        switch (type) {
            case 'info':
                console.log(`${Colors.prototype.blue()}${lang.info.toUpperCase()}${Colors.CONSOLE_RESET} | ${message}`)
                break
            case 'warning':
            case 'warn':
                console.log(`${Colors.prototype.yellow()}${lang.warning.toUpperCase()}${Colors.CONSOLE_RESET} | ${message}`)
                break
            case 'error':
            case 'err':
                console.log(`${Colors.prototype.red()}${lang.error.toUpperCase()}${Colors.CONSOLE_RESET} | ${message}`)
                break
            case 'debug':
                if (config.debug) {
                    console.log(`${lang.debug.toUpperCase()} | ${message}`)
                }
                break
            default:
                throw new Error(`${lang.invalid}`)
        }
    }
}

module.exports = Logger;
