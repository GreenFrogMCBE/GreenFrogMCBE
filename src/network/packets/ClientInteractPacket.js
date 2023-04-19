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
/* eslint-disable no-case-declarations */
const ServerContainerOpenPacket = require("./ServerContainerOpenPacket");

const PacketConstructor = require("./PacketConstructor");

const InventoryType = require("./types/InventoryType");
const InteractType = require("./types/InteractType");
const WindowID = require("./types/WindowID");

const Logger = require("../../server/Logger");
const Frog = require("../../Frog");
const { getKey } = require("../../utils/Language");

class ClientInteractPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * 
	 * @returns {string} The name of the packet
	 * @function
	 */
	getPacketName() {
		return "interact";
	}

	/**
	 * Returns if is the packet critical?
	 * 
	 * @returns {boolean} Returns if the packet is critical
	 * @function
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Reads the packet from client
	 * 
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server
	 */
	async readPacket(player, packet, server) {
		const actionID = packet.data.params.action_id;

		Frog.eventEmitter.emit('playerInteractEvent', {
			player,
			server,
			actionID
		})

		switch (actionID) {
			case InteractType.INVENTORYOPEN:
				let shouldOpen = true

				const containerCoordinates = {
					x: 0,
					y: 0,
					z: 0
				}

				Frog.eventEmitter.emit('playerContainerOpen', {
					windowID: WindowID.CREATIVE,
					windowType: InventoryType.INVENTORY,
					isSentByServer: false,
					runtimeID: 2,
					player,
					server,
					containerCoordinates,
					cancel() {
						shouldOpen = false
					}
				})

				if (!shouldOpen) return

				const containerOpen = new ServerContainerOpenPacket();
				containerOpen.setWindowID(WindowID.CREATIVE);
				containerOpen.setWindowType(InventoryType.INVENTORY);
				containerOpen.setRuntimeEntityId(2);
				containerOpen.setCoordinates(containerCoordinates.x, containerCoordinates.y, containerCoordinates.z);
				containerOpen.writePacket(player);
				break;
			default:
				Logger.debug(getKey("debug.player.unsupportedActionID").replace("%s%", actionID).replace("%d%", player.username));
		}
	}
}

module.exports = ClientInteractPacket;
