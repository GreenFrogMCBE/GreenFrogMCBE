class Logger {
    constructor() { }

    log(message, type = 'info') {
        console.log(`${type}: ${message}`)
    }

}

module.exports = Logger;