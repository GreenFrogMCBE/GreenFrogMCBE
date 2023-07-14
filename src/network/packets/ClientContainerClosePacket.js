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
const ServerContainerClosePacket = require("./ServerContainerClosePacket");

const PacketConstructor = require("./PacketConstructor");

const vanillaBlocks = require("../../api/block/vanillaBlocks.json");

const WindowId = require("./types/WindowId");
const Frog = require("../../Frog");

class ClientContainerClosePacket extends PacketConstructor {
	name = "container_close";

	async readPacket(player, packet, server) {
		let shouldClose = true;

		Frog.eventEmitter.emit("playerContainerClose", {
			windowID: WindowId.CREATIVE,
			sentByServer: false,
			player,
			packet,
			server,
			cancel: () => {
				shouldClose = false;
			},
		});

		if (!shouldClose) return;

		if (player.inventory.container.isOpen) {
			let shouldRemoveTheChest = true;

			Frog.eventEmitter.emit("inventoryContainerChestRemoval", {
				player: player,
				server: Frog.getServer(),
				cancel: () => {
					shouldRemoveTheChest = false;
				},
			});

			if (!shouldRemoveTheChest) return;

			const { x, y, z } = player.inventory.container.blockPosition;

			player.world.placeBlock(x, y, z, vanillaBlocks.air.legacy_id);

			player.inventory.container.isOpen = false;
			player.inventory.container.blockPosition = { x: null, y: null, z: null };
			player.inventory.container.window = { id: null, type: null };
		}

		const containerClose = new ServerContainerClosePacket();
		containerClose.server = false;
		containerClose.window_id = WindowId.CREATIVE;
		containerClose.writePacket(player);
	}
}

module.exports = ClientContainerClosePacket;
