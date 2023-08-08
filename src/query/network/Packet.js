/* eslint-disable no-unused-vars */
class Packet {
    constructor() { }

    /** @type {number | unknown} */
    packetId;

    /**
     * @param {import("dgram").RemoteInfo} client
     * @param {Buffer} packet
     * @param {import("dgram").Socket} socket
     * @param {import("Frog").QuerySettings} [querySettings]
     */
    readPacket(client, packet, socket, querySettings) { }

    /**
     * @param {import("dgram").RemoteInfo} client
     * @param {import("dgram").Socket} socket
     */
    writePacket(client, socket) { }
}

module.exports = Packet;
