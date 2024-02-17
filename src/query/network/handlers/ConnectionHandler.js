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
	handle_connection(socket, settings, packet, client) {
		const packet_type = packet.readUInt8(2)

		let should_cancel_packet = true

		Frog.event_emitter.emit("queryPacket", {
			socket,
			settings,
			packet,
			client,
			cancel: () => {
				should_cancel_packet = false
			},
		})

		if (!should_cancel_packet) return

		switch (packet_type) {
			case QueryPacket.HANDSHAKE:
				return new ClientHandshakeRequestPacket()
					.read_packet(client, packet, socket)
			case QueryPacket.INFO:
				return new ClientInfoRequestPacket()
					.read_packet(client, packet, socket, settings)
			default:
				return new ClientInvalidPacket()
					.read_packet(client, packet)
		}
	}
}

module.exports = ConnectionHandler
