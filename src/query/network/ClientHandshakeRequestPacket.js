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

const ClientTokens = require("../utils/ClientTokens")

const QueryPacket = require("./types/QueryPacket")

const ServerHandshakeResponsePacket = require("./ServerHandshakeResponsePacket")

class ClientHandshakeRequestPacket extends Packet {
	packetId = QueryPacket.HANDSHAKE

	/**
	 * @param {import("dgram").RemoteInfo} client
	 * @param {Buffer} packet
	 * @param {import("dgram").Socket} socket
	 */
	read_packet(client, packet, socket) {
		const sessionID = packet.readInt32BE(3)

		ClientTokens.clientTokens.set(`${client.address},${client.port}`, sessionID)

		const handshakeResponsePacket = new ServerHandshakeResponsePacket()
		handshakeResponsePacket.sessionId = sessionID
		handshakeResponsePacket.payload = sessionID.toString()
		handshakeResponsePacket.write_packet(client, socket)
	}
}

module.exports = ClientHandshakeRequestPacket
