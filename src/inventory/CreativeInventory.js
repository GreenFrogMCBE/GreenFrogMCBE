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
const Frog = require("../Frog")

const Logger = require("../utils/Logger")

const { get_key } = require("../utils/Language")

const ServerInventorySlotPacket = require("../network/packets/ServerInventorySlotPacket")

const { EventEmitter, Event } = require("@kotinash/better-events")

const { WindowType, Transaction } = require("@greenfrog/mc-enums")

const Inventory = require("./Inventory")

class CreativeInventory extends Inventory {
	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	handle(player, packet) {
		try {
			const requests = packet.data.params.requests
			const request = requests[0]
			const first_action = request.actions[0]
			const second_action = request.actions[1]

			if (first_action && second_action && second_action.type_id === Transaction.Results) {
				EventEmitter.emit(
					new Event(
						"inventoryPreItemRequest",
						{
							count: first_action.count,
							network_id: second_action.result_items[0].network_id,
							block_runtime_id: second_action.result_items[0].block_runtime_id,
						},
						(() => {
							player.inventory.last_used_item.runtimeId = second_action.result_items[0].block_runtime_id
							player.inventory.last_used_item.networkId = second_action.result_items[0].network_id

							player.inventory.items.push({
								count: first_action.count,
								network_id: second_action.result_items[0].network_id,
								block_runtime_id: second_action.result_items[0].block_runtime_id,
							})

							Frog.event_emitter.emit(
								new Event(
									"inventoryPostItemRequest",
									{
										count: first_action.count,
										network_id: second_action.result_items[0].network_id,
										block_runtime_id: second_action.result_items[0].block_runtime_id,
										inventoryItems: player.inventory.items,
									}
								),
								false
							)

							if (first_action.type_id === Transaction.Place) {
								const inventory_slot_packet = new ServerInventorySlotPacket()
								inventory_slot_packet.window_id = WindowType.Creative
								inventory_slot_packet.slot = first_action.destination.slot
								inventory_slot_packet.item = {
									network_id: player.inventory.last_used_item.networkId,
									count: first_action.count,
									metadata: 0,
									has_stack_id: true,
									stack_id: 1,
									block_runtime_id: player.inventory.last_used_item.runtimeId,
									extra: {
										has_nbt: false,
										can_place_on: [],
										can_destroy: [],
									},
								}
								inventory_slot_packet.write_packet(player)
							}
						})
					),
					true
				)
			}
		} catch (error) {
			Logger.error(get_key("creativemenu.badPacket", [player.username, error.stack]))
		}
	}
}

module.exports = CreativeInventory
