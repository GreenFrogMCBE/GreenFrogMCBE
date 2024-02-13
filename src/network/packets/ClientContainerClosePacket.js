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
const ServerContainerClosePacket = require("./ServerContainerClosePacket")

const Packet = require("./Packet")

const vanillaBlocks = require("../../block/vanillaBlocks.json")

const WindowId = require("../../inventory/types/WindowId")

const Frog = require("../../Frog")

class ClientContainerClosePacket extends Packet {
	name = "container_close"

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async read_packet(player, packet) {
		let should_close = true

		Frog.event_emitter.emit("playerContainerClose", {
			player,
			window_id: WindowId.CREATIVE,
			sent_by_server: false,
			packet,
			cancel: () => {
				should_close = false
			},
		})

		if (!should_close) return

		if (player.inventory.container.isOpen) {
			let should_remove_the_chest = true

			Frog.event_emitter.emit("inventoryContainerChestRemove", {
				player,
				cancel: () => {
					should_remove_the_chest = false
				},
			})

			if (!should_remove_the_chest) return

			const { x, y, z } = player.inventory.container.blockPosition

			player.world.place_block(x, y, z, vanillaBlocks.air.legacy_id)

			player.inventory.container.isOpen = false
			player.inventory.container.blockPosition = { x: undefined, y: undefined, z: undefined }
			player.inventory.container.window = { id: undefined, type: undefined }
		}

		const container_close = new ServerContainerClosePacket()
		container_close.server = false
		container_close.window_id = WindowId.CREATIVE
		container_close.write_packet(player)
	}
}

module.exports = ClientContainerClosePacket
