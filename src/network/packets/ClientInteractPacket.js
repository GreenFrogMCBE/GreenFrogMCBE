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

class ClientInteractPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "interact";
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
	 * 
	 * @param {Client} player
	 * @param {JSON} packet
	 * @param {Server} server 
	 */
	async readPacket(player, packet, server) {
		const actionID = packet.data.params.action_id;

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
				Frog.eventEmitter.emit('playerInteractEvent', {
					player,
					server,
					actionID
				})

				Logger.debug(`Unsupported action ID from ${player.username}: ${actionID}`);
		}
	}
}

module.exports = ClientInteractPacket;
