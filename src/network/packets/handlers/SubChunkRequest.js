const SubChunk = require('../SubChunk')

class SubChunkRequest extends require("./Handler") {
    handle(client) {
        new SubChunk().writePacket(client)
    }
}

module.exports = SubChunkRequest