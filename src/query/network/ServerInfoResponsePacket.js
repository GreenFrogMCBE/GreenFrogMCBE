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

class ServerInfoResponsePacket extends Packet {
	packet_id = QueryPacket.INFO

	/** @type {number | undefined} */
	session_id
	/** @type {string | undefined} */
	serverName
	/** @type {string | undefined} */
	level_name
	/** @type {string | undefined} */
	game
	/** @type {string | undefined} */
	version
	/** @type {string | undefined} */
	plugins
	/** @type {string[] | undefined} */
	players
	/** @type {import("Frog").Gamemode | undefined} */
	gamemode
	/** @type {number | undefined} */
	numPlayers
	/** @type {number | undefined} */
	max_players
	/** @type {number | undefined} */
	serverPort
	/** @type {string | undefined} */
	serverAddress
	/** @type {boolean | undefined} */
	whitelist
	/** @type {boolean | undefined} */
	isFullPacket

	/**
	 * @param {import("dgram").RemoteInfo} client
	 * @param {import("dgram").Socket} socket
	 */
	write_packet(client, socket) {
		if (this.isFullPacket) {
			const buffer = new SmartBuffer()
				.writeUInt8(0x00)
				.writeInt32BE(/** @type {number} */ (this.session_id))
				.writeStringNT("splitnum")
				.writeUInt8(0x80)
				.writeUInt8(0x00)

			const kvData = [
				{ key: "hostname", value: this.serverName },
				{ key: "gametype", value: this.gamemode },
				{ key: "game_id", value: this.game },
				{ key: "version", value: this.version },
				{ key: "plugins", value: this.plugins },
				{ key: "map", value: this.level_name },
				{ key: "numplayers", value: this.numPlayers },
				{ key: "maxplayers", value: this.max_players },
				{ key: "whitelist", value: this.whitelist },
				{ key: "hostip", value: this.serverAddress },
				{ key: "hostport", value: this.serverPort },
			]

			kvData.forEach(({ key, value }) => {
				buffer.writeStringNT(String(key))
				buffer.writeStringNT(String(value))
			})

			buffer.writeUInt8(0x00).writeUInt8(0x01).writeStringNT("player_").writeUInt8(0x00)

			if (this.players) {
				this.players.forEach((player_name) => {
					buffer.writeStringNT(player_name)
				})
			}

			buffer.writeUInt8(0x00)

			socket.send(buffer.toBuffer(), client.port, client.address)
		} else {
			socket.send(
				new SmartBuffer()
					.writeUInt8(this.packet_id)
					.writeInt32BE(/** @type {number} */ (this.session_id))
					.writeStringNT(/** @type {string} */ (this.serverName))
					.writeStringNT(/** @type {string} */ (this.game))
					.writeStringNT(/** @type {string} */ (this.level_name))
					.writeStringNT(/** @type {string} */ (this.players?.toString() || ""))
					.writeStringNT(/** @type {string} */ (this.max_players?.toString()))
					.writeUInt16LE(/** @type {number} */ (this.serverPort))
					.writeStringNT(/** @type {string} */ (this.serverAddress))
					.toBuffer(),
				client.port,
				client.address,
			)
		}
	}
}

module.exports = ServerInfoResponsePacket
