const InvalidBlockException = require("../../utils/exceptions/InvalidBlockException")

module.exports = {
    convert(legacyId) {
        const creativeContent = require("../../resources/creativeContent.json")

        const { items } = creativeContent

        for (item of items) {
            if (legacyId === item.item.network_id) {
                return item.item.block_runtime_id
            }
        }

        throw new InvalidBlockException("Invalid legacy ID was provided")
    }
}