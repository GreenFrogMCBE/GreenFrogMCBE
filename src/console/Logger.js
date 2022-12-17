const config = require('../../config.json')
const lang = require(`../../lang/${config.lang}.json`)

class Logger {
    constructor() { }

    log(message, type = 'info') {
        switch (type) {
            case 'info':
                console.log(`\x1b[34m${lang.info.toUpperCase()}\x1b[0m | ${message}`)
                break
            case 'warning':
            case 'warn':
                console.log(`\x1b[33m${lang.warning.toUpperCase()}\x1b[0m | ${message}`)
                break
            case 'error':
            case 'err':
                console.log(`\x1b[31m${lang.error.toUpperCase()}\x1b[0m | ${message}`)
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
