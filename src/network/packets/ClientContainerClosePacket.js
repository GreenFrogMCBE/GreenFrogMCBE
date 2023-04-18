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
const ServerContainerClosePacket = require("./ServerContainerClosePacket");

const PacketConstructor = require("./PacketConstructor");

const WindowID = require("./types/WindowID");
const Frog = require("../../Frog");

class ClientContainerClosePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string} The name of the packet
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
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		let shouldClose = true

		Frog.eventEmitter.emit('playerContainerClose', {
			windowID: WindowID.CREATIVE,
			isSentByServer: false,
			player,
			packet,
			server,
			cancel() {
				shouldClose = false
			}
		})

		if (!shouldClose) return

		const containerClose = new ServerContainerClosePacket();
		containerClose.setServer(false);
		containerClose.setWindowID(WindowID.CREATIVE);
		containerClose.writePacket(player);
	}
}

module.exports = ClientContainerClosePacket;
