/* eslint-disable no-case-declarations */
const BlockBreakException = require("../../utils/exceptions/BlockBreakException");
const PacketConstructor = require("./PacketConstructor");

const Gamemode = require("../../api/player/Gamemode");
const BlockActions = require("../../world/types/BlockActions");

const Logger = require("../../server/Logger");
const Frog = require("../../Frog");

const ServerLevelChunkPacket = require("./ServerLevelChunkPacket");

const WorldGenerators = require("../../world/types/WorldGenerators");

const { getKey } = require("../../utils/Language");

const { serverConfigurationFiles } = Frog;
const { config } = serverConfigurationFiles;

class ClientInventoryTransactionPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "inventory_transaction";
	}

	/**
	 * Returns if the packet is critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Reads the packet from client
	 *
	 * @param {Client} player
	 * @param {JSON} packet
	 */
	async readPacket(player, packet, server) {
		let actionID = null;

		try {
			actionID = packet.data.params.transaction.transaction_data.action_type;
		} catch {
			actionID = null;
		}

		switch (actionID) {
			case BlockActions.BLOCKBREAK:
				if (player.gamemode == Gamemode.ADVENTURE || player.gamemode == Gamemode.SPECTATOR) {
					throw new BlockBreakException(getKey("exceptions.network.inventoryTransaction.invalid").replace("%s%", player.username));
				}

				Frog.eventEmitter.emit("blockBreakEvent", {
					actions: packet.data.params.actions,
					legacy: packet.data.params.transaction.legacy,
					player: player,
					server: server,
					action: packet.data.params.transaction.transaction_data.actionType,
					blockPosition: packet.data.params.transaction.transaction_data.block_position,
					transactionType: packet.data.params.transaction.transaction_type,
					cancel: () => {
						let chunks = require(`${__dirname}/../../world/chunks${config.generator === WorldGenerators.DEFAULT ? "" : "_flat"}json`);

						for (const chunk of chunks) {
							for (let x = 0; x < 80 /** magic value */; x++) {
								if (chunk.x == x) {
									const levelchunk = new ServerLevelChunkPacket();
									levelchunk.setX(chunk.x);
									levelchunk.setZ(chunk.z);
									levelchunk.setSubChunkCount(chunk.sub_chunk_count);
									levelchunk.setCacheEnabled(chunk.cache_enabled);
									levelchunk.setPayload(chunk.payload.data);
									levelchunk.writePacket(this.player);
								}
							}
						}
					},
				});

				player.world.breakBlock(packet.data.params.transaction.transaction_data.block_position.x, packet.data.params.transaction.transaction_data.block_position.y, packet.data.params.transaction.transaction_data.block_position.z);
				break;
			default:
				Logger.debug(getKey("debug.player.unsupportedActionID.block").replace("%s%", player.username).replace("%d%", actionID));
		}
	}
}

module.exports = ClientInventoryTransactionPacket;
