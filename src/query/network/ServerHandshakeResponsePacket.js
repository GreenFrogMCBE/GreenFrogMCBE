const Packet = require("./Packet");

const { SmartBuffer } = require("@harmonytf/smart-buffer");

const QueryPacket = require("./types/QueryPacket");

class ServerHandshakeResponsePacket extends Packet {
    packetId = QueryPacket.HANDSHAKE;

    /** @type {number | undefined} */
    sessionId;
    /** @type {string | undefined} */
    payload;

    /**
     * @param {import("dgram").RemoteInfo} client
     * @param {import("dgram").Socket} socket
     */
    writePacket(client, socket) {
        socket.send(
            new SmartBuffer()
                .writeUInt8(QueryPacket.HANDSHAKE)
                .writeInt32BE(/** @type {number} */ (this.sessionId))
                .writeStringNT(/** @type {string} */ (this.payload))
                .toBuffer(),
            client.port,
            client.address,
        )
    }
}

module.exports = ServerHandshakeResponsePacket;