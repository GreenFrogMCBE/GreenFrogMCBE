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

const Packet = require("./Packet");

const vanillaBlocks = require("../../block/vanillaBlocks.json");

const WindowId = require("../../inventory/types/WindowId");

const Frog = require("../../Frog");

class ClientContainerClosePacket extends Packet {
	name = "container_close";

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async readPacket(player, packet) {
		let shouldClose = true;

		Frog.eventEmitter.emit("playerContainerClose", {
			windowID: WindowId.CREATIVE,
			sentByServer: false,
			player,
			packet,
			cancel: () => {
				shouldClose = false;
			},
		});

		if (!shouldClose) return;

		if (player.inventory.container.isOpen) {
			let shouldRemoveTheChest = true;

			Frog.eventEmitter.emit("inventoryContainerChestRemoval", {
				player,
				cancel: () => {
					shouldRemoveTheChest = false;
				},
			});

			if (!shouldRemoveTheChest) return;

			const { x, y, z } = player.inventory.container.blockPosition;

			player.world.placeBlock(x, y, z, vanillaBlocks.air.legacy_id);

			player.inventory.container.isOpen = false;
			player.inventory.container.blockPosition = { x: undefined, y: undefined, z: undefined };
			player.inventory.container.window = { id: undefined, type: undefined };
		}

		const containerClose = new ServerContainerClosePacket();
		containerClose.server = false;
		containerClose.window_id = WindowId.CREATIVE;
		containerClose.writePacket(player);
	}
}

module.exports = ClientContainerClosePacket;
