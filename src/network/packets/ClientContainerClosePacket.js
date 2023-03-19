/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
const PlayerContainerCloseEvent = require("../../events/PlayerContainerCloseEvent");
const ServerContainerClosePacket = require("./ServerContainerClosePacket");
const PacketConstructor = require("./PacketConstructor");
const WindowIds = require("./types/WindowIds");

class ClientContainerClosePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns The name of the packet
	 */
	getPacketName() {
		return "container_close"
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * Reads the packet from client
	 * @param {any} player
	 * @param {JSON} packet
	 */
	async readPacket(player) {
		const containerclose = new ServerContainerClosePacket()
		containerclose.setServer(false)
		containerclose.setWindowId(WindowIds.CREATIVE)
		containerclose.writePacket(player)

		const containercloseevent = new PlayerContainerCloseEvent()
		containercloseevent.execute(
			require("../../Server").server,
			player
		)
	}
}

module.exports = ClientContainerClosePacket;
