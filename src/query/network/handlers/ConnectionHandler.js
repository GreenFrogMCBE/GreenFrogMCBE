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
const Frog = require("../../../Frog")

const ClientHandshakeRequestPacket = require("../ClientHandshakeRequestPacket")
const ClientInfoRequestPacket = require("../ClientInfoRequestPacket")
const ClientInvalidPacket = require("../ClientInvalidPacket")

const QueryPacket = require("../types/QueryPacket")

class ConnectionHandler {
	/**
	 * @param {import("dgram").Socket} socket
	 * @param {import("Frog").QuerySettings} settings
	 * @param {Buffer} packet
	 * @param {import("dgram").RemoteInfo} client
	 */
	handleConnection(socket, settings, packet, client) {
		const packetType = packet.readUInt8(2)

		let shouldCancelPacket = true

		Frog.event_emitter.emit("queryPacket", {
			socket,
			settings,
			packet,
			client,
			cancel: () => {
				shouldCancelPacket = false
			},
		})

		if (!shouldCancelPacket) return

		switch (packetType) {
			case QueryPacket.HANDSHAKE:
				new ClientHandshakeRequestPacket().read_packet(client, packet, socket)
				break
			case QueryPacket.INFO:
				new ClientInfoRequestPacket().read_packet(client, packet, socket, settings)
				break
			default:
				new ClientInvalidPacket().read_packet(client, packet)
				break
		}
	}
}

module.exports = ConnectionHandler
