class Logger {
    constructor() { }

    log (message, type = 'info') {
        switch (type) {
            case 'info':
                console.log(`\x1b[34mINFO\x1b[0m | ${message}`)
                break
            case 'warning':
            case 'warn':
                console.log(`\x1b[33mWARNING\x1b[0m | ${message}`)
                break
            case 'error':
            case 'err':
                console.log(`\x1b[31mERROR\x1b[0m | ${message}`)
                break
            default:
                throw new Error(`Invalid log type: ${type}`)
        }
    }
}

module.exports = Logger;
