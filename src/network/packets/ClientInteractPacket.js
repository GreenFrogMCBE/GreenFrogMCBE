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
const UnsupportedOperationException = require("../../events/exceptions/UnsupportedOperationException");

const PlayerContainerOpenEvent = require("../../events/PlayerContainerOpenEvent");

const PacketConstructor = require("./PacketConstructor");

const InteractType = require("./types/InteractType");
const WindowID = require("./types/WindowID");

const Logger = require("../../server/Logger");
const InventoryType = require("./types/InventoryType");

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
	 * @param {any} player
	 * @param {JSON} packet
	 */
	async readPacket(player, packet, server) {
		const actionID = packet.data.params.action_id;

		switch (actionID) {
			case InteractType.INVENTORYOPEN:
				const event = new PlayerContainerOpenEvent();
				event.server = server;
				event.client = player;
				event.windowID = WindowID.CREATIVE;
				event.windowType = InventoryType.INVENTORY;
				event.runtimeId = 2;
				event.execute();
				break;
			case InteractType.MOUSEOVERENTITY:
				// TODO: This thing is related to PVP, but it is not implemented yet in GreenFrog
				break;
			default:
				Logger.debug("Unsupported action ID: " + actionID);
		}
	}

	/**
	 * Writes the packet to the client
	 */
	writePacket() {
		throw new UnsupportedOperationException("Cannot write client-side packet");
	}
}

module.exports = ClientInteractPacket;
