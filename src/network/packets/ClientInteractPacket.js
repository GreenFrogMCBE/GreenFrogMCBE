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
const ContainerOpen = require("./ServerContainerClosePacket");
const InventoryTypes = require("./types/InventoryTypes");
const PacketConstructor = require("./PacketConstructor");
const InteractTypes = require("./types/InteractTypes");
const WindowIds = require("./types/WindowIds");
const Logger = require("../../server/Logger");

class ClientInteractPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns The name of the packet
	 */
	getPacketName() {
		return "interact"
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
	async readPacket(player, packet) {
		const actionID = packet.data.params.action_id

		switch (actionID) {
			case InteractTypes.INVENTORYOPEN:
				const containeropen = new ContainerOpen()
				containeropen.setWindowId(WindowIds.CREATIVE)
				containeropen.setWindowType(InventoryTypes.INVENTORY)
				containeropen.setRuntimeEntityId(2)
				containeropen.setCoordinates(0, 0, 0)
				containeropen.writePacket(player)
				break
			case InteractTypes.MOUSEOVERENTITY:
				// TODO: This thing is related to PVP, but it is not implemented yet in GreenFrog
				break
			default:
				Logger.debug("Unsupported action ID: " + actionID)
		}
	}
}

module.exports = ClientInteractPacket;