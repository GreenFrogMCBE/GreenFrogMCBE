class Colors {
    constructor() {}

    blue() {
        return "\x1b[34m"
    }

    yellow() {
        return "\x1b[33m"
    }

    red() {
        return "\x1b[31m"
    }

    reset() {
        return "\x1b[0m"
    }

}

module.exports = Colors;