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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const ServerContainerClosePacket = require("./ServerContainerClosePacket");

const PacketConstructor = require("./PacketConstructor");

const WindowId = require("./types/WindowId");
const Frog = require("../../Frog");

class ClientContainerClosePacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "container_close";
	}

	/**
	 * Reads the packet from client
	 *
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		let shouldClose = true;

		Frog.eventEmitter.emit("playerContainerClose", {
			windowID: WindowId.CREATIVE,
			isSentByServer: false,
			player,
			packet,
			server,
			cancel: () => {
				shouldClose = false;
			},
		});

		if (!shouldClose) return;

		const containerClose = new ServerContainerClosePacket();
		containerClose.setServer(false);
		containerClose.setWindowId(WindowId.CREATIVE);
		containerClose.writePacket(player);
	}
}

module.exports = ClientContainerClosePacket;
