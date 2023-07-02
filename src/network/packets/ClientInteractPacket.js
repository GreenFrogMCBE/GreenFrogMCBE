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
/* eslint-disable no-case-declarations */
const ServerContainerOpenPacket = require("./ServerContainerOpenPacket");

const PacketConstructor = require("./PacketConstructor");

const WindowType = require("./types/WindowType");
const InteractType = require("../../world/types/InteractType");
const WindowId = require("./types/WindowId");

const Logger = require("../../server/Logger");
const Frog = require("../../Frog");

const { getKey } = require("../../utils/Language");

class ClientInteractPacket extends PacketConstructor {
	name = "interact";

	async readPacket(player, packet, server) {
		const actionID = packet.data.params.action_id;

		let shouldInteract = true;

		Frog.eventEmitter.emit("playerInteractEvent", {
			player,
			server,
			actionID,
			cancel: () => {
				shouldInteract = false;
			},
		});

		if (!shouldInteract) return;

		switch (actionID) {
			case InteractType.INVENTORYOPEN:
				let shouldOpen = true;

				const containerCoordinates = {
					x: 0,
					y: 0,
					z: 0,
				};

				Frog.eventEmitter.emit("playerContainerOpen", {
					windowID: WindowId.CREATIVE,
					windowType: WindowType.CREATIVE_INVENTORY,
					isSentByServer: false,
					runtimeID: 2,
					player,
					server,
					containerCoordinates,
					cancel: () => {
						shouldOpen = false;
					},
				});

				if (!shouldOpen) return;

				const containerOpen = new ServerContainerOpenPacket();
				containerOpen.window_id = WindowId.CREATIVE;
				containerOpen.window_type = WindowType.CREATIVE_INVENTORY;
				containerOpen.runtime_entity_id = 2;
				containerOpen.coordinates = { x: containerCoordinates.x, y: containerCoordinates.y, z: containerCoordinates.z };
				containerOpen.writePacket(player);
				break;
			default:
				Logger.debug(getKey("debug.player.unsupportedActionID").replace("%s%", actionID).replace("%d%", player.username));
		}
	}
}

module.exports = ClientInteractPacket;
