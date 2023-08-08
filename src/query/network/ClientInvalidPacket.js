/* eslint-disable no-unused-vars */
const Frog = require("../../Frog");

const Packet = require("./Packet");

const { getKey } = require("../../utils/Language");

const QueryLogger = require("../utils/QueryLogger");

const QueryPacket = require("./types/QueryPacket");

class ClientInvalidPacket extends Packet {
    packetId = QueryPacket.INVALID;

    /**
     * @param {import("dgram").RemoteInfo} client
     * @param {Buffer} packet
     */
    readPacket(client, packet) {
        // Emit the event
        Frog.eventEmitter.emit("queryInvalidPacket", {
            client,
            packet
        });

        // Log the packet
        QueryLogger.logPacket(
            getKey("query.server.network.packets.invalidPacket")
                .replace("%s", client.address.toString()),
            true
        )
    }
}

module.exports = ClientInvalidPacket;