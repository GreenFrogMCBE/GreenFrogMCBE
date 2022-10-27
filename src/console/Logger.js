class Logger {
    constructor() {}

    log(message, type) {
        if (!type) {
            type = 'info'
        }
        console.log(`${type}: ${message}`)
    }
    
}

module.exports = Logger;