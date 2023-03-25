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

const WindowID = require("./types/WindowID");

class ClientContainerClosePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "container_close";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Reads the packet from client
	 * @param {any} player
	 * @param {JSON} packet
	 */
	async readPacket(player) {
		const containerclose = new ServerContainerClosePacket();
		containerclose.setServer(false);
		containerclose.setWindowID(WindowID.CREATIVE);
		containerclose.writePacket(player);

		const containerCloseEvent = new PlayerContainerCloseEvent();
		containerCloseEvent.player = player;
		containerCloseEvent.server = require("../../Server");
		containerCloseEvent.isRequestByServer = false;
		containerCloseEvent.windowID = WindowID.CREATIVE;
		containerCloseEvent.execute();
	}
}

module.exports = ClientContainerClosePacket;
