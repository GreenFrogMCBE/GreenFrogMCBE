class ItemException extends Error {
    constructor(message) {
        super("ItemException: " + message)
        this.name = 'ItemException'
    }
}

module.exports = ItemException