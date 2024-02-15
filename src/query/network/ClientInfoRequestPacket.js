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
/* eslint-disable no-case-declarations */
const Packet = require("./Packet")

const ServerInfoResponsePacket = require("./ServerInfoResponsePacket")

const ClientTokens = require("../utils/ClientTokens")

const PlayerInfo = require("../../player/PlayerInfo")

const QueryPacket = require("./types/QueryPacket")
const InfoRequest = require("./types/InfoRequest")

const Frog = require("../../Frog")
const PluginManager = require("../../plugins/PluginManager")

class ClientInfoRequestPacket extends Packet {
	packet_id = QueryPacket.INFO

	/**
	 * @param {import("dgram").RemoteInfo} client
	 * @param {Buffer} packet
	 * @param {import("dgram").Socket} socket
	 * @param {import("Frog").QuerySettings} querySettings
	 */
	read_packet(client, packet, socket, querySettings) {
		const session_id = ClientTokens.clientTokens.get(`${client.address},${client.port}`)

		switch (packet.length) {
			case InfoRequest.BASIC:
				const basicInfoResponsePacket = new ServerInfoResponsePacket()
				basicInfoResponsePacket.game = "MINECRAFTBE"
				basicInfoResponsePacket.level_name = querySettings.level_name
				basicInfoResponsePacket.numPlayers = PlayerInfo.players_online.length
				basicInfoResponsePacket.max_players = querySettings.max_players
				basicInfoResponsePacket.serverName = querySettings.motd
				basicInfoResponsePacket.serverAddress = querySettings.host
				basicInfoResponsePacket.serverPort = querySettings.port
				basicInfoResponsePacket.session_id = session_id
				basicInfoResponsePacket.write_packet(client, socket)
				break
			case InfoRequest.FULL:
				const fullInfoResponsePacket = new ServerInfoResponsePacket()
				fullInfoResponsePacket.isFullPacket = true
				fullInfoResponsePacket.game = "MINECRAFTBE"
				fullInfoResponsePacket.level_name = querySettings.level_name
				fullInfoResponsePacket.serverName = querySettings.motd
				fullInfoResponsePacket.numPlayers = PlayerInfo.players_online.length
				fullInfoResponsePacket.max_players = querySettings.max_players
				fullInfoResponsePacket.version = querySettings.version
				fullInfoResponsePacket.serverAddress = querySettings.host
				fullInfoResponsePacket.serverPort = querySettings.port
				fullInfoResponsePacket.gamemode = Frog.config.world.gamemode.world
				fullInfoResponsePacket.plugins = Frog.config.query.show_plugins ? "GreenFrogMCBE: " + PluginManager.plugins.toString() : "GreenFrogMCBE: "
				fullInfoResponsePacket.session_id = session_id
				fullInfoResponsePacket.whitelist = false // TODO: Implement whitelist
				fullInfoResponsePacket.write_packet(client, socket)
				break
		}
	}
}

module.exports = ClientInfoRequestPacket
