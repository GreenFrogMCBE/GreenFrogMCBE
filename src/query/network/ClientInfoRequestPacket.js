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
	packetId = QueryPacket.INFO

	/**
	 * @param {import("dgram").RemoteInfo} client
	 * @param {Buffer} packet
	 * @param {import("dgram").Socket} socket
	 * @param {import("Frog").QuerySettings} querySettings
	 */
	readPacket(client, packet, socket, querySettings) {
		const sessionId = ClientTokens.clientTokens.get(`${client.address},${client.port}`)

		switch (packet.length) {
			case InfoRequest.BASIC:
				const basicInfoResponsePacket = new ServerInfoResponsePacket()
				basicInfoResponsePacket.game = "MINECRAFTBE"
				basicInfoResponsePacket.levelName = querySettings.levelName
				basicInfoResponsePacket.numPlayers = PlayerInfo.playersOnline.length
				basicInfoResponsePacket.maxPlayers = querySettings.maxPlayers
				basicInfoResponsePacket.serverName = querySettings.motd
				basicInfoResponsePacket.serverAddress = querySettings.host
				basicInfoResponsePacket.serverPort = querySettings.port
				basicInfoResponsePacket.sessionId = sessionId
				basicInfoResponsePacket.writePacket(client, socket)
				break
			case InfoRequest.FULL:
				const fullInfoResponsePacket = new ServerInfoResponsePacket()
				fullInfoResponsePacket.isFullPacket = true
				fullInfoResponsePacket.game = "MINECRAFTBE"
				fullInfoResponsePacket.levelName = querySettings.levelName
				fullInfoResponsePacket.serverName = querySettings.motd
				fullInfoResponsePacket.numPlayers = PlayerInfo.playersOnline.length
				fullInfoResponsePacket.maxPlayers = querySettings.maxPlayers
				fullInfoResponsePacket.version = querySettings.version
				fullInfoResponsePacket.serverAddress = querySettings.host
				fullInfoResponsePacket.serverPort = querySettings.port
				fullInfoResponsePacket.gamemode = Frog.config.world.gamemode.world
				fullInfoResponsePacket.plugins = Frog.config.query.showPlugins ? "GreenFrogMCBE: " + PluginManager.plugins.toString() : "GreenFrogMCBE: "
				fullInfoResponsePacket.sessionId = sessionId
				fullInfoResponsePacket.whitelist = false // TODO: Implement whitelist
				fullInfoResponsePacket.writePacket(client, socket)
				break
		}
	}
}

module.exports = ClientInfoRequestPacket
