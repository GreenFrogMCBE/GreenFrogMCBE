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
const ServerContainerOpenPacket = require("./ServerContainerOpenPacket");

const Packet = require("./Packet");

const WindowType = require("../../inventory/types/WindowType");
const WindowId = require("../../inventory/types/WindowId");
const Interact = require("../../world/types/Interact");

const Logger = require("../../utils/Logger");
const Frog = require("../../Frog");

const { getKey } = require("../../utils/Language");

class ClientInteractPacket extends Packet {
	name = "interact";

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async readPacket(player, packet) {
		const actionID = packet.data.params.action_id;

		let shouldInteract = true;

		Frog.eventEmitter.emit("playerInteract", {
			player,
			actionID,
			cancel: () => {
				shouldInteract = false;
			},
		});

		if (!shouldInteract) return;

		switch (actionID) {
			case Interact.INVENTORY_OPEN:
				let shouldOpenInventory = true;

				/** @type {import("Frog").Vec3} */
				const containerCoordinates = {
					x: 0,
					y: 0,
					z: 0,
				};

				Frog.eventEmitter.emit("playerContainerOpen", {
					player,
					windowId: WindowId.CREATIVE,
					windowType: WindowType.CREATIVE_INVENTORY,
					sentByServer: false,
					runtimeId: 1,
					containerCoordinates,
					cancel: () => {
						shouldOpenInventory = false;
					},
				});

				if (!shouldOpenInventory) return;

				const containerOpen = new ServerContainerOpenPacket();
				containerOpen.window_id = WindowId.CREATIVE;
				containerOpen.window_type = WindowType.CREATIVE_INVENTORY;
				containerOpen.runtime_entity_id = 1;
				containerOpen.coordinates = { x: containerCoordinates.x, y: containerCoordinates.y, z: containerCoordinates.z };
				containerOpen.writePacket(player);
				break;
			default:
				Logger.debug(getKey("debug.player.unsupportedAction.id").replace("%s", actionID).replace("%d", player.username));
		}
	}
}

module.exports = ClientInteractPacket;
