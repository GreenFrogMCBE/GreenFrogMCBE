/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Packet = require("./Packet")

const { SmartBuffer } = require("@harmonytf/smart-buffer")

const QueryPacket = require("./types/QueryPacket")

class ServerHandshakeResponsePacket extends Packet {
	packetId = QueryPacket.HANDSHAKE

	/** @type {number | undefined} */
	sessionId
	/** @type {string | undefined} */
	payload

	/**
	 * @param {import("dgram").RemoteInfo} client
	 * @param {import("dgram").Socket} socket
	 */
	write_packet(client, socket) {
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

module.exports = ServerHandshakeResponsePacket
