// /**
//  * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
//  * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
//  * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
//  * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
//  * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
//  * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
//  *
//  *
//  * Copyright 2023 andriycraft
//  * Github: https://github.com/andriycraft/GreenFrogMCBE
//  */
// const PacketConstructor = require("./PacketConstructor");

// const PlayerMoveEvent = require("../../events/PlayerMoveEvent");

// class ClientMovePacket extends PacketConstructor {
// 	/**
// 	 * Returns the packet name
// 	 * @returns {String} The name of the packet
// 	 */
// 	getPacketName() {
// 		return "move_player";
// 	}

// 	/**
// 	 * Returns if is the packet critical?
// 	 * @returns {Boolean} Returns if the packet is critical
// 	 */
// 	isCriticalPacket() {
// 		return false;
// 	}

// 	/**
// 	 * Reads the packet from player
// 	 * @param {Client} player
// 	 * @param {JSON} packet
// 	 * @param {Server} server
// 	 */
// 	async readPacket(player, packet, server) {
// 		await this.validatePacket(player);

// 		let position = packet.data.params.position;

// 		if (player.x == position.x && player.y == position.y && player.z == position.z) {
// 			// This code prevents a few crashers, that spam PlayerMove packet to overload the server
// 			return;
// 		}

// 		const playerMoveEvent = new PlayerMoveEvent();
// 		playerMoveEvent.player = player;
// 		playerMoveEvent.server = server;
// 		playerMoveEvent.position = position;
// 		playerMoveEvent.location = position;
// 		playerMoveEvent.onGround = packet.data.params.on_ground;
// 		playerMoveEvent.mode = packet.data.params.mode;
// 		playerMoveEvent.execute();
// 	}
// }

// module.exports = ClientMovePacket;
