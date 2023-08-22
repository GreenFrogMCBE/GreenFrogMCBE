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
const Logger = require("../utils/Logger");

const InvalidGamemodeException = require("../utils/exceptions/InvalidGamemodeException");

const GarbageCollector = require("../utils/GarbageCollector");

const { getKey } = require("../utils/Language");

const vanillaBlocks = require("../block/vanillaBlocks.json");

const ServerTextPacket = require("../network/packets/ServerTextPacket");
const ServerSetTimePacket = require("../network/packets/ServerSetTimePacket");
const ServerTransferPacket = require("../network/packets/ServerTransferPacket");
const ServerSetHealthPacket = require("../network/packets/ServerSetHealthPacket");
const ServerSetEntityMotion = require("../network/packets/ServerSetEntityMotion");
const ServerPlayStatusPacket = require("../network/packets/ServerPlayStatusPacket");
const ServerPlayerListPacket = require("../network/packets/ServerPlayerListPacket");
const ServerSetDifficultyPacket = require("../network/packets/ServerSetDifficultyPacket");
const ServerSetEntityDataPacket = require("../network/packets/ServerSetEntityDataPacket");
const ServerContainerOpenPacket = require("../network/packets/ServerContainerOpenPacket");
const ServerMoveEntityDataPacket = require("../network/packets/ServerMoveEntityDataPacket");
const ServerChangeDimensionPacket = require("../network/packets/ServerChangeDimensionPacket");
const ServerUpdateAttributesPacket = require("../network/packets/ServerUpdateAttributesPacket");
const ServerInventoryContentPacket = require("../network/packets/ServerInventoryContentPacket");
const ServerSetPlayerGameTypePacket = require("../network/packets/ServerSetPlayerGameTypePacket");
const ServerChunkRadiusUpdatePacket = require("../network/packets/ServerChunkRadiusUpdatePacket");

const PermissionManager = require("../permission/PermissionManager");

const TextType = require("./types/Text");
const Gamemode = require("./types/Gamemode");
const DamageCause = require("./types/DamageCause");
const HungerCause = require("./types/HungerCause");
const WindowId = require("../inventory/types/WindowId");
const WindowType = require("../inventory/types/WindowType");
const PlayerAttribute = require("./types/Attribute");
const PlayerListAction = require("../network/packets/types/PlayerListAction");

const PlayerInfo = require("./PlayerInfo");

const Frog = require("../Frog");

module.exports = {
	/**
	 * Adds API functions to the player object
	 *
	 * @param {import("Frog").Player} player
	 */
	async initPlayer(player) {
		/**
		 * Kills the player
		 *
		 * @param {import("Frog").DamageCause} cause
		 */
		player.kill = function (cause = DamageCause.UNKNOWN) {
			let shouldKillPlayer = true;

			Frog.eventEmitter.emit("playerKill", {
				player,
				cancel: () => {
					shouldKillPlayer = false;
				},
			});

			if (!shouldKillPlayer) return;

			player.setHealth(0, cause);
		};

		/**
		 * Sends a chat message as the player
		 *
		 * @param {string} message
		 */
		player.chat = function (message) {
			let shouldSendMessage = true;

			Frog.eventEmitter.emit("serverChatAsPlayer", {
				player,
				message,
				cancel: () => {
					shouldSendMessage = false;
				},
			});

			if (!shouldSendMessage) return;

			Frog.broadcastMessage(getKey('chat.format').replace("%s", player.username).replace("%d", message));
		};

		/**
		 * Teleports the player
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 * @param {number | undefined} rotation_x
		 * @param {number | undefined} rotation_y
		 * @param {number | undefined} rotation_z
		 */
		player.teleport = function (x, y, z, rotation_x = undefined, rotation_y = undefined, rotation_z = undefined) {
			let shouldTeleport = true;

			Frog.eventEmitter.emit("playerTeleport", {
				player,
				x,
				y,
				z,
				rotation_x,
				rotation_y,
				rotation_z,
				cancel: () => {
					shouldTeleport = false;
				},
			});

			if (!shouldTeleport) return;

			const movePacket = new ServerMoveEntityDataPacket();
			movePacket.flags = {
				has_x: true,
				has_y: true,
				has_z: true,
				has_rot_x: false,
				has_rot_y: false,
				has_rot_z: false,
				on_ground: false,
				teleport: true,
				force_move: true,
			};
			movePacket.runtime_entity_id = 1;
			movePacket.coordinates.x = x;
			movePacket.coordinates.y = y;
			movePacket.coordinates.z = z;
			movePacket.coordinatesRotation.x = Number(rotation_x);
			movePacket.coordinatesRotation.y = Number(rotation_y);
			movePacket.coordinatesRotation.z = Number(rotation_z);
			movePacket.writePacket(player);
		};

		/**
		 * Transfers the player to a different server
		 *
		 * @param {string} address - The address of the server to transfer to
		 * @param {number} port - The port of the server to transfer to
		 */
		player.transfer = function (address, port) {
			let shouldTransfer = true;

			Frog.eventEmitter.emit("playerTransfer", {
				player,
				port,
				address,
				cancel: () => {
					shouldTransfer = false;
				},
			});

			if (!shouldTransfer) return;

			const transferPacket = new ServerTransferPacket();
			transferPacket.server_address = address;
			transferPacket.port = port;
			transferPacket.writePacket(player);
		};

		/**
		 * Sends a chat message to the player
		 *
		 * @param {string} message
		 */
		player.sendMessage = function (message) {
			let shouldSendMessage = true;

			Frog.eventEmitter.emit("serverMessage", {
				player,
				message,
				cancel: () => {
					shouldSendMessage = false;
				},
			});

			if (!shouldSendMessage) return;

			const textPacket = new ServerTextPacket();
			textPacket.message = message;
			textPacket.needs_translation = false;
			textPacket.type = TextType.ANNOUNCEMENT;
			textPacket.platform_chat_id = "";
			textPacket.source_name = "";
			textPacket.xuid = "";
			textPacket.writePacket(player);
		};

		/**
		 * Sets player's gamemode
		 *
		 * @param {import("Frog").Gamemode} gamemode - The gamemode. This can be survival, creative, adventure, spectator or fallback
		 */
		player.setGamemode = function (gamemode) {
			const allowedGamemodes = [
				Gamemode.SURVIVAL,
				Gamemode.CREATIVE,
				Gamemode.ADVENTURE,
				Gamemode.SPECTATOR,
				Gamemode.FALLBACK
			];

			if (!allowedGamemodes.includes(gamemode)) {
				throw new InvalidGamemodeException(gamemode);
			}

			let shouldChangeGamemode = true;

			Frog.eventEmitter.emit("serverGamemodeChange", {
				player,
				gamemode,
				cancel: () => {
					shouldChangeGamemode = false;
				},
			});

			if (!shouldChangeGamemode) return;

			player.gamemode = gamemode;

			const playerGamemode = new ServerSetPlayerGameTypePacket();
			playerGamemode.gamemode = gamemode;
			playerGamemode.writePacket(player);
		};

		/**
		 * Sets player's velocity
		 * NOTE: This is handled by the player, and not server-side
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 */
		player.setVelocity = function (x, y, z) {
			let shouldSetVelocity = true;

			Frog.eventEmitter.emit("serverVelocityUpdate", {
				player,
				coordinates: {
					x,
					y,
					z,
				},
				cancel: () => {
					shouldSetVelocity = false;
				},
			});

			if (!shouldSetVelocity) return;

			const setEntityMotionPacket = new ServerSetEntityMotion();
			setEntityMotionPacket.runtime_entity_id = 1;
			setEntityMotionPacket.velocity = { x, y, z };
			setEntityMotionPacket.writePacket(player);
		};

		/**
		 * Sends play status to the player
		 *
		 * @param {import("Frog").PlayStatus} playStatus
		 * @param {boolean} [terminateConnection]
		 */
		player.sendPlayStatus = function (playStatus, terminateConnection = false) {
			let sendPlayStatus = true;

			Frog.eventEmitter.emit("playerPlayStatus", {
				player,
				playStatus,
				terminateConnection,
				cancel: () => {
					sendPlayStatus = false;
				},
			});

			if (!sendPlayStatus) return;

			const playStatusPacket = new ServerPlayStatusPacket();
			playStatusPacket.status = playStatus;
			playStatusPacket.writePacket(player);

			if (terminateConnection) {
				Logger.info(getKey("kickMessages.playStatus.console").replace("%s", player.username));

				setTimeout(() => {
					if (!player.network.offline) {
						// If the player does not disconnect itself for some reason
						player.kick(getKey("kickMessages.playStatus").replace("%s", playStatusPacket.toString()));
					}
				}, 5000);
			}
		};

		/**
		 * Sets player's local difficulty
		 *
		 * @param {import("Frog").Difficulty} difficulty
		 */
		player.setDifficulty = function (difficulty) {
			let shouldChangeDifficulty = true;

			Frog.eventEmitter.emit("serverSetDifficulty", {
				player,
				difficulty,
				cancel: () => {
					shouldChangeDifficulty = false;
				},
			});

			if (!shouldChangeDifficulty) return;

			const difficultyPacket = new ServerSetDifficultyPacket();
			difficultyPacket.difficulty = difficulty;
			difficultyPacket.writePacket(player);
		};

		/**
		 * Sets the data of the player (eg on_fire, etc)
		 *
		 * @param {import("Frog").EntityData} data
		 */
		player.setEntityData = function (data) {
			let shouldSetEntityData = true;

			Frog.eventEmitter.emit("serverSetEntityData", {
				player,
				data,
				cancel: () => {
					shouldSetEntityData = false;
				},
			});

			if (!shouldSetEntityData) return;

			const playerSetEntityDataPacket = new ServerSetEntityDataPacket();
			playerSetEntityDataPacket.properties = {
				ints: [],
				floats: [],
			};
			playerSetEntityDataPacket.runtime_entity_id = "1"; // Local player
			playerSetEntityDataPacket.tick = "0";
			playerSetEntityDataPacket.value = data;
			playerSetEntityDataPacket.writePacket(player);
		};

		/**
		 * Disconnects the player from the server
		 *
		 * @param {string} [message=lang["kickMessages.serverDisconnect"]]
		 * @param {boolean} [hideDisconnectionScreen=false]
		 */
		player.kick = function (message = lang["kickMessages.serverDisconnect"], hideDisconnectionScreen = false) {
			Frog.eventEmitter.emit("playerKick", {
				player,
				message,
			});

			if (message === "disconnectionScreen.serverFull") {
				message = "Wow this server is popular! Check back later to see if space opens up.";
			} else if (message === "disconnectionScreen.noReason") {
				message = "You were disconnected";
			}

			Logger.info(getKey("player.kicked").replace("%s", player.username).replace("%d", message));
			player.disconnect(message, hideDisconnectionScreen);
		};

		/**
		 * Updates the player chunk render radius
		 *
		 * @param {number} radius
		 */
		player.setChunkRadius = function (radius) {
			let shouldUpdateRadius = true;

			Frog.eventEmitter.emit("serverUpdateChunkRadius", {
				player,
				radius,
				cancel: () => {
					shouldUpdateRadius = false;
				},
			});

			if (!shouldUpdateRadius) return;

			const chunkRadiusUpdate = new ServerChunkRadiusUpdatePacket();
			chunkRadiusUpdate.chunk_radius = radius;
			chunkRadiusUpdate.writePacket(player);
		};

		/**
		 * Sets the player side time
		 *
		 * @param {number} time - The time to set the player to
		 */
		player.setTime = function (time) {
			let shouldUpdateTime = true;

			Frog.eventEmitter.emit("serverTimeUpdate", {
				player,
				time,
				cancel: () => {
					shouldUpdateTime = false;
				},
			});

			if (!shouldUpdateTime) return;

			const timePacket = new ServerSetTimePacket();
			timePacket.time = time;
			timePacket.writePacket(player);
		};

		/**
		 * Sets an attribute for the player
		 *
		 * @param {import("Frog").Attribute} attribute
		 */
		player.setAttribute = function (attribute) {
			let shouldSetAttribute = true;

			Frog.eventEmitter.emit("playerSetAttribute", {
				player,
				attribute,
				cancel: () => {
					shouldSetAttribute = false;
				},
			});

			if (shouldSetAttribute) {
				const updateAttributesPacket = new ServerUpdateAttributesPacket();
				updateAttributesPacket.runtime_entity_id = 1; // 1 - Local player
				updateAttributesPacket.tick = 0;
				updateAttributesPacket.attributes = [attribute];
				updateAttributesPacket.writePacket(player);
			}
		};

		/**
		 * Sets the XP for the player
		 *
		 * @param {number} xp
		 */
		player.setXP = function (xp) {
			let shouldSetXP = true;

			Frog.eventEmitter.emit("serverSetXP", {
				player,
				xp,
				cancel: () => {
					shouldSetXP = false;
				},
			});

			if (!shouldSetXP) return;

			player.setAttribute({
				min: 0,
				max: 1000000,
				current: xp,
				default: 0,
				name: PlayerAttribute.EXPERIENCE,
				modifiers: [],
			});
		};

		/**
		 * Sets the health of the player
		 *
		 * @param {number} health
		 * @param {import("Frog").DamageCause} cause
		 */
		player.setHealth = function (health, cause = DamageCause.UNKNOWN) {
			if (player.dead) return;

			let shouldSetHealth = true;

			Frog.eventEmitter.emit("serverSetHealth", {
				player,
				health,
				cause,
				cancel: () => {
					shouldSetHealth = false;
				},
			});

			if (!shouldSetHealth) return;

			const setHealthPacket = new ServerSetHealthPacket();
			setHealthPacket.health = health;
			setHealthPacket.writePacket(player);

			player.setAttribute({
				name: PlayerAttribute.HEALTH,
				min: 0,
				max: 20,
				current: health,
				default: 0,
				modifiers: [],
			});

			player.health = health;

			if (cause === DamageCause.FALL) {
				Frog.eventEmitter.emit("playerFallDamage", {
					player,
					health,
					cause,
				});
			}

			if (cause === DamageCause.REGENERATION) {
				Frog.eventEmitter.emit("playerRegenerate", {
					player,
					health,
					cause,
				});
			}

			if (player.health <= 0) {
				Frog.eventEmitter.emit("playerDeath", { player });

				player.dead = true;
			}
		};

		/**
		 * Sets the hunger of the player
		 *
		 * @param {number} hunger
		 * @param {import("Frog").HungerCause} cause
		 */
		player.setHunger = function (hunger, cause = HungerCause.UNKNOWN) {
			let shouldUpdateHunger = true;

			Frog.eventEmitter.emit("playerHungerUpdate", {
				player,
				hunger,
				cause,
				cancel: () => {
					shouldUpdateHunger = false;
				},
			});

			if (!shouldUpdateHunger) return;

			player.setAttribute({
				name: PlayerAttribute.HUNGER,
				min: 0,
				max: 20,
				current: hunger,
				default: 0,
				modifiers: [],
			});

			player.hunger = hunger;
		};

		/**
		 * Changes the dimension for the player
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 * @param {import("Frog").DimensionId} dimension
		 * @param {boolean} [respawn]
		 */
		player.setDimension = function (x, y, z, dimension, respawn = false) {
			let shouldChangeDimension = true;

			Frog.eventEmitter.emit("serverSetDimension", {
				player,
				dimension,
				coordinates: { x, y, z },
				respawnAfterSwitch: respawn,
				cancel: () => {
					shouldChangeDimension = false;
				},
			});

			if (!shouldChangeDimension) return;

			const dimensionPacket = new ServerChangeDimensionPacket();
			dimensionPacket.position = { x, y, z };
			dimensionPacket.dimension = dimension;
			dimensionPacket.respawn = respawn;
			dimensionPacket.writePacket(player);
		};

		/**
		 * Sets the speed for the player
		 *
		 * @param {number} speed
		 */
		player.setSpeed = async function (speed) {
			let shouldUpdateSpeed = true;

			Frog.eventEmitter.emit("serverSpeedUpdate", {
				speed,
				cancel: () => {
					shouldUpdateSpeed = false;
				},
			});

			if (!shouldUpdateSpeed) return;

			player.setAttribute({
				min: 0,
				max: 3.4,
				current: speed,
				default: speed,
				name: PlayerAttribute.MOVEMENT_SPEED,
				modifiers: [],
			});
		};

		/**
		 * Changes the OP status for the player
		 *
		 * @param {boolean} status
		 */
		player.setOp = function (status) {
			return PermissionManager.setOpStatus(player.username, status);
		};

		/**
		 * Opens a container for the player
		 */
		player.openContainer = function () {
			let shouldPreCreateInventoryContainer = true;

			Frog.eventEmitter.emit("inventoryContainerPreCreate", {
				player: player,
				cancel: () => {
					shouldPreCreateInventoryContainer = false;
				},
			});

			if (!shouldPreCreateInventoryContainer) return;

			player.inventory.container.blockPosition = { x: Math.floor(player.location.x - 1), y: player.location.y + 2, z: Math.floor(player.location.z - 1) };
			player.inventory.container.window = { id: WindowId.CHEST, type: WindowType.CONTAINER };

			let shouldCreateInventoryContainer = true;

			Frog.eventEmitter.emit("inventoryContainerCreate", {
				player: player,
				inventory: player.inventory,
				cancel: () => {
					shouldCreateInventoryContainer = false;
				},
			});

			if (!shouldCreateInventoryContainer) return;

			player.world.placeBlock(player.inventory.container.blockPosition.x, player.inventory.container.blockPosition.y, player.inventory.container.blockPosition.z, vanillaBlocks.chest.runtime_id);

			const containerOpen = new ServerContainerOpenPacket();
			containerOpen.window_id = /** @type {import("Frog").WindowId} */ (player.inventory.container.window.id);
			containerOpen.window_type = /** @type {import("Frog").WindowType} */ (player.inventory.container.window.type);
			containerOpen.runtime_entity_id = -1;
			containerOpen.coordinates = { x: player.inventory.container.blockPosition.x || 0, y: player.inventory.container.blockPosition.y || 0, z: player.inventory.container.blockPosition.z || 0 };
			containerOpen.writePacket(player);

			player.inventory.container.isOpen = true;
		};

		/**
		 * Updates an item in a container (if open)
		 *
		 * @param {number} itemId
		 * @param {number} blockRuntimeId - You can convert the item ID to a block runtime ID using https://github.com/GreenFrogMCBE/GreenFrogMCBE/blob/main/src/api/block/LegacyToRuntimeIdConverter.js
		 * @param {number} slot
		 * @param {number} count
		 * @param {import("Frog").ItemExtraData} extra - Extra data
		 */
		player.setContainerItem = function (itemId, blockRuntimeId, slot = 0, metadata = false, hasStackId = true, stackId = 1, count = 1, extra = { has_nbt: false, can_place_on: [], can_destroy: [] }) {
			let shouldGiveContainerItem = true;

			Frog.eventEmitter.emit("inventoryContainerGiveItem", {
				player: player,
				itemData: {
					itemId,
					blockRuntimeId,
					slot,
					metadata,
					hasStackId,
					stackId,
					count,
					extra,
				},
				cancel: () => {
					shouldGiveContainerItem = false;
				},
			});

			if (!shouldGiveContainerItem) return;

			/** @type {import("Frog").Item[]} */
			const input = [];

			for (let i = 0; i < 27; i++) {
				input.push({ network_id: 0 });
			}

			input[slot] = {
				network_id: itemId,
				count,
				metadata,
				has_stack_id: hasStackId,
				stack_id: stackId,
				block_runtime_id: blockRuntimeId,
				extra,
			};

			const inventoryContent = new ServerInventoryContentPacket();
			inventoryContent.window_id = WindowId.CHEST;
			inventoryContent.input = input;
			inventoryContent.writePacket(player);
		};

		/**
		 * Listens when a player leaves the server
		 */
		player.on("close", () => {
			for (const currentPlayer of PlayerInfo.playersOnline) {
				if (currentPlayer.username === player.username) {
					continue;
				}

				const playerList = new ServerPlayerListPacket();
				playerList.type = PlayerListAction.REMOVE;
				// Fix JSDoc Error: Profile is possibly undefined
				if (!player.profile) return;
				playerList.uuid = player.profile.uuid;
				playerList.writePacket(currentPlayer);
			}

			player.offline = true;
			GarbageCollector.clearOfflinePlayers();

			Frog.eventEmitter.emit("playerLeave", { player });

			Logger.info(getKey("status.resourcePacks.disconnected").replace("%s", player.username));

			if (player.initialised && Frog.config.chat.systemMessages.left) {
				Frog.broadcastMessage(getKey("chat.broadcasts.left").replace("%s", player.username));
			}
		});
	},
};
