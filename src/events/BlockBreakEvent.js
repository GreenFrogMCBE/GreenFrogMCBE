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
const { config } = require("../api/ServerInfo");

const Air = require("../block/Air");

const ServerLevelChunkPacket = require("../network/packets/ServerLevelChunkPacket");
const WorldGenerator = require("../network/packets/types/WorldGenerator");

const Event = require("./Event");

class BlockBreakEvent extends Event {
	constructor() {
		super();
		this.name = "BlockBreakEvent";
		this.legacy = null;
		this.actions = null;
		this.transaction_type = null;
		this.transaction_data = null;
		this.player = null;
		this.server = null;
		this.block_position = null;
		this.cancelled = false;
	}

	cancel() {
		this.cancelled = true;

		let chunks = require(`${__dirname}/../../world/chunks${config.generator === WorldGenerator.DEFAULT ? "" : "_flat"}.json`);

		for (const chunk of chunks) {
			for (let x = 0; x < 80; x++) {
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
	}

	execute() {
		this._execute(this);

		if (!this.cancelled) {
			const airBlockID = new Air().getRuntimeId();

			this.player.world.placeBlock(this.block_position.x, this.block_position.y, this.block_position.z, airBlockID);
		}
	}
}

module.exports = BlockBreakEvent;
