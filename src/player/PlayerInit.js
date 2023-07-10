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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Logger = require("../server/Logger");

const Gamemode = require("../api/player/Gamemode");

const InvalidGamemodeException = require("../utils/exceptions/InvalidGamemodeException");

const vanillaBlocks = require("../api/block/vanillaBlocks.json");

const ServerTextPacket = require("../network/packets/ServerTextPacket");
const ServerChangedimensionPacket = require("../network/packets/ServerChangeDimensionPacket");
const ServerUpdateAttributesPacket = require("../network/packets/ServerUpdateAttributesPacket");
const ServerTransferPacket = require("../network/packets/ServerTransferPacket");
const ServerSetDifficultyPacket = require("../network/packets/ServerSetDifficultyPacket");
const ServerSetPlayerGameTypePacket = require("../network/packets/ServerSetPlayerGameTypePacket");
const ServerSetEntityDataPacket = require("../network/packets/ServerSetEntityDataPacket");
const ServerChunkRadiusUpdatePacket = require("../network/packets/ServerChunkRadiusUpdatePacket");
const ServerSetTimePacket = require("../network/packets/ServerSetTimePacket");
const ServerSetHealthPacket = require("../network/packets/ServerSetHealthPacket");
const ServerSetEntityMotion = require("../network/packets/ServerSetEntityMotion");
const ServerPlayStatusPacket = require("../network/packets/ServerPlayStatusPacket");
const ServerContainerOpenPacket = require("../network/packets/ServerContainerOpenPacket");
const ServerMoveEntityDataPacket = require("../network/packets/ServerMoveEntityDataPacket");
const ServerInventoryContentPacket = require("../network/packets/ServerInventoryContentPacket");

const PlayerList = require("../network/packets/ServerPlayerListPacket");
const PlayerListType = require("../network/packets/types/PlayerListType");

const GarbageCollector = require("../utils/GarbageCollector");

const DamageCause = require("../api/health/DamageCause");
const HungerCause = require("../api/health/HungerCause");
const WindowId = require("../network/packets/types/WindowId");
const WindowType = require("../network/packets/types/WindowType");
const PlayerAttribute = require("../api/attribute/PlayerAttribute");
const Text = require("../api/types/Text");

const PlayerInfo = require("../api/player/PlayerInfo");

const Frog = require("../Frog");

const { getKey } = require("../utils/Language");

/** @private */
let lang = Frog.serverConfigurationFiles.lang;

module.exports = {
	/**
	 * Adds API functions to the client object
	 *
	 * @param {Client} player
	 * @param {Server} server
	 */
	async initPlayer(player, server) {
		/**
		 * Sends a message to the player
		 * @param {string} message - The message to send
		 */
		player.sendMessage = function (message) {
			let shouldSendMessage = true;

			Frog.eventEmitter.emit("serverToClientMessage", {
				player,
				server,
				message,
				cancel: () => {
					shouldSendMessage = false;
				},
			});

			if (!shouldSendMessage) return;

			const text = new ServerTextPacket();
			text.message = message;
			text.needs_translation = false;
			text.type = Text.ANNOUNCEMENT;
			text.platform_chat_id = "";
			text.source_name = "";
			text.xuid = "";
			text.writePacket(player);
		};

		/**
		 * Sends a chat message as a player
		 * @param {string} message - The message to send as a player
		 */
		player.chat = function (message) {
			let shouldSendMessage = true;

			Frog.eventEmitter.emit("serverChatAsPlayer", {
				player,
				server,
				message,
				cancel: () => {
					shouldSendMessage = false;
				},
			});

			if (!shouldSendMessage) return;

			Frog.broadcastMessage(lang.chat.chatFormat.replace("%username%", this.player.username).replace("%message%", this.message));
		};

		/**
		 * Sets player's gamemode
		 *
		 * @param {Gamemode} gamemode - The gamemode. This can be survival, creative, adventure, spectator or fallback
		 * @type {import('../api/player/Gamemode')}
		 */
		// prettier-ignore
		player.setGamemode = function (gamemode) {
			const allowedGamemodes = [
				Gamemode.SURVIVAL,
				Gamemode.CREATIVE,
				Gamemode.ADVENTURE,
				Gamemode.SPECTATOR,
				Gamemode.FALLBACK
			];

			if (!allowedGamemodes.includes(gamemode)) {
				throw new InvalidGamemodeException(gamemode)
			}

			let shouldChangeGamemode = true;

			Frog.eventEmitter.emit('serverGamemodeChange', {
				player,
				server,
				gamemode,
				oldGamemode: player.gamemode,
				cancel: () => {
					shouldChangeGamemode = false
				},
			});

			if (!shouldChangeGamemode) return;

			player.gamemode = gamemode;
			player.fallDamageQueue = 0; // To fix the bug that you get insta-killed if you changed your gamemode to survival

			const playerGamemode = new ServerSetPlayerGameTypePacket();
			playerGamemode.gamemode = gamemode;
			playerGamemode.writePacket(player);
		};

		/**
		 * Sets player's velocity
		 * NOTE: This is handled by the client, and not server-side
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 */
		player.setVelocity = function (x, y, z) {
			let shouldSetVelocity = true;

			Frog.eventEmitter.emit("serverVelocityUpdate", {
				player,
				server: Frog.getServer(),
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
			setEntityMotionPacket.runtime_entity_id = 0;
			setEntityMotionPacket.velocity = { x, y, z };
			setEntityMotionPacket.writePacket(player);
		};

		/**
		 * Teleports the player
		 *
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 * @param {number} rot_x
		 * @param {number} rot_y
		 * @param {number} rot_z
		 */
		player.teleport = function (x, y, z, rot_x = undefined, rot_y = undefined, rot_z = undefined) {
			let shouldTeleport = true;

			Frog.eventEmitter.emit("playerTeleport", {
				x,
				y,
				z,
				has_rot_x: rot_x !== undefined,
				has_rot_y: rot_y !== undefined,
				has_rot_z: rot_z !== undefined,
				player,
				server: Frog.getServer(),
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
			movePacket.coordinatesRotation.x = rot_x;
			movePacket.coordinatesRotation.y = rot_y;
			movePacket.coordinatesRotation.z = rot_z;
			movePacket.writePacket(player);
		};

		/**
		 * Sends play status to the player
		 *
		 * @param {PlayStatus} play_status
		 * @param {boolean} terminate_connection
		 */
		player.sendPlayStatus = function (play_status, terminate_connection = false) {
			let sendPlayStatus = true;

			Frog.eventEmitter.emit("playerPlayStatus", {
				player,
				play_status,
				terminate_connection,
				server: server,
				cancel: () => {
					sendPlayStatus = false;
				},
			});

			if (!sendPlayStatus) return;

			const playStatus = new ServerPlayStatusPacket();
			playStatus.status = play_status;
			playStatus.writePacket(player);

			if (terminate_connection) {
				Logger.info(getKey("kickMessages.playStatus.console").replace("%s%", player.username));

				setTimeout(() => {
					// Client should disconnect itself, this is added to prevent hacked clients from bypassing kicks
					if (!player.offline) {
						player.kick(getKey("kickMessages.playStatus").replace("%s%", play_status));
					}
				}, 5000);
			}
		};

		/**
		 * Transfers the player to a different server
		 *
		 * @param {string} address - The address of the server to transfer to
		 * @param {number} port - The port of the server to transfer to
		 */
		player.transfer = function (address, port) {
			let shouldTransfer = true;

			Frog.eventEmitter.emit("playerTransferEvent", {
				player,
				port,
				address,
				server: server,
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
		 * Sets player's local difficulty
		 *
		 * @param {Difficulty} difficulty
		 */
		player.setDifficulty = function (difficulty) {
			let shouldChangeDifficulty = true;

			Frog.eventEmitter.emit("serverSetDifficulty", {
				player,
				difficulty,
				server: Frog.getServer(),
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
		 * @param {{field: string, value: any}} data
		 */
		player.setEntityData = function (data) {
			let shouldSetEntityData = true;

			Frog.eventEmitter.emit("serverSetEntityData", {
				player,
				data,
				server: Frog.getServer(),
				cancel: () => {
					shouldSetEntityData = false;
				},
			});

			if (!shouldSetEntityData) return;

			const playerSetEntityDataPacket = new ServerSetEntityDataPacket();
			playerSetEntityDataPacket.properties = {
				ints: [],
				numbers: [],
			};
			playerSetEntityDataPacket.runtime_entity_id = "1"; // 1 - local player
			playerSetEntityDataPacket.tick = "0";
			playerSetEntityDataPacket.value = data;
			playerSetEntityDataPacket.writePacket(player);
		};

		/**
		 * Disconnect a player from the server
		 *
		 * @param {string} [message=lang.kickmessages.kickedByPlugin]
		 * @param {boolean} [hideDisconnectionScreen=false]
		 */
		player.kick = function (message = lang.kickmessages.kickedByPlugin, hideDisconnectionScreen = false) {
			if (player.kicked) return;

			player.kicked = true;

			Frog.eventEmitter.emit("playerKickEvent", {
				player,
				message,
				server: Frog.getServer(),
			});

			if (message === "disconnectionScreen.serverFull") {
				message = "Wow this server is popular! Check back later to see if space opens up.";
			} else if (message === "disconnectionScreen.noReason") {
				message = "You were disconnected";
			}

			Logger.info(getKey("player.kicked").replace("%s%", player.username).replace("%d%", message));
			player.disconnect(message, hideDisconnectionScreen);
		};

		/**
		 * Updates the client chunk render radius
		 *
		 * @param {number} chunkRadius
		 */
		player.setChunkRadius = function (chunkRadius) {
			let shouldUpdateRadius = true;

			Frog.eventEmitter.emit("serverUpdateChunkRadius", {
				player,
				radius: chunkRadius,
				server: Frog.getServer(),
				cancel: () => {
					shouldUpdateRadius = false;
				},
			});

			if (!shouldUpdateRadius) return;

			const chunkRadiusUpdate = new ServerChunkRadiusUpdatePacket();
			chunkRadiusUpdate.chunk_radius = chunkRadius;
			chunkRadiusUpdate.writePacket(player);
		};

		/**
		 * Sets the client side time
		 *
		 * @param {number} time - The time to set the player to
		 */
		player.setTime = function (time = 0) {
			let shouldUpdateTime = true;

			Frog.eventEmitter.emit("serverTimeUpdate", {
				player,
				time,
				server: Frog.getServer(),
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
		 * Sets some attribute for the player
		 *
		 * @param {JSON} attribute
		 */
		player.setAttribute = function (attribute) {
			let shouldSetAttribute = true;

			Frog.eventEmitter.emit("playerSetAttribute", {
				player,
				attribute,
				server: Frog.getServer(),
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
				server: Frog.getServer(),
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
		 * @param {DamageCause} cause
		 */
		player.setHealth = function (health, cause = DamageCause.UNKNOWN) {
			if (player.dead) return;

			let shouldSetHealth = true;

			Frog.eventEmitter.emit("serverSetHealth", {
				player,
				health,
				cause,
				server: Frog.getServer(),
				cancel: () => {
					shouldSetHealth = false;
				},
			});

			if (!shouldSetHealth) return;

			const setHealthPacket = new ServerSetHealthPacket();
			setHealthPacket.health = health;
			setHealthPacket.writePacket(player);

			if (cause === DamageCause.FALL) {
				Frog.eventEmitter.emit("playerFallDamageEvent", {
					player,
					health,
					cause,
					server: Frog.getServer(),
				});
			}

			if (cause === DamageCause.REGENERATION) {
				Frog.eventEmitter.emit("playerRegenerationEvent", {
					player,
					health,
					cause,
					server: Frog.getServer(),
				});
			}

			player.setAttribute({
				name: PlayerAttribute.HEALTH,
				min: 0,
				max: 20,
				current: health,
				default: 0,
				modifiers: [],
			});

			player.health = health;

			if (player.health <= 0) {
				Frog.eventEmitter.emit("playerDeathEvent", {
					player,
					server: Frog.getServer(),
				});

				player.dead = true;
			}
		};

		/**
		 * Sets the hunger of the player
		 *
		 * @param {number} hunger
		 * @param {HungerCause} cause
		 */
		player.setHunger = function (hunger, cause = HungerCause.UNKNOWN) {
			let shouldUpdateHunger = true;

			Frog.eventEmitter.emit("playerHungerUpdate", {
				player,
				server: Frog.getServer(),
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
		 * @param {Dimension} dimension
		 * @param {boolean} respawn
		 *
		 * @type {import('../network/packets/types/Dimension')}
		 */
		player.setDimension = function (x, y, z, dimension, respawn) {
			let shouldChangeDimension = true;

			Frog.eventEmitter.emit("serverSetDimension", {
				player,
				dimension,
				coordinates: { x, y, z },
				respawnAfterSwitch: respawn,
				server: Frog.getServer(),
				cancel: () => {
					shouldChangeDimension = false;
				},
			});

			if (!shouldChangeDimension) return;

			const dimensionPacket = new ServerChangedimensionPacket();
			dimensionPacket.positon = { x, y, z };
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
				server: Frog.getServer(),
				cancel: () => {
					shouldUpdateSpeed = false;
				},
			});

			if (!shouldUpdateSpeed) return;

			player.setAttribute({
				min: 0,
				max: 3.4028234663852886e38,
				current: speed,
				default: speed,
				name: PlayerAttribute.MOVEMENT_SPEED,
				modifiers: [],
			});
		};

		/**
		 * Changes the OP status for the player
		 *
		 * @param {boolean} op
		 */
		player.setOp = async function (op) {
			let shouldChange = true;

			Frog.eventEmitter.emit("playerOpStatusChange", {
				player,
				status: op,
				server: Frog.getServer(),
				cancel: () => {
					shouldChange = true;
				},
			});

			if (!shouldChange) return;

			if (op) await fs.appendFile("ops.yml", player.username + "\n");
			else {
				const ops = await fs.readFile("ops.yml", "utf-8");
				const updatedOps = ops
					.split("\n")
					.filter((op) => op !== player.username)
					.join("\n");

				await fs.writeFile("ops.yml", updatedOps);
			}

			player.op = op;
		};

		/**
		 * Opens a container (chest) for the player
		 */
		player.openContainer = function () {
			let shouldPreCreateInventoryContainer = true;

			Frog.eventEmitter.emit("inventoryContainerPreCreate", {
				player: player,
				server: Frog.getServer(),
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
				server: Frog.getServer(),
				cancel: () => {
					shouldCreateInventoryContainer = false;
				},
			});

			if (!shouldCreateInventoryContainer) return;

			player.world.placeBlock(player.inventory.container.blockPosition.x, player.inventory.container.blockPosition.y, player.inventory.container.blockPosition.z, vanillaBlocks.chest.runtime_id);

			const containerOpen = new ServerContainerOpenPacket();
			containerOpen.window_id = player.inventory.container.window.id;
			containerOpen.window_type = player.inventory.container.window.type;
			containerOpen.runtime_entity_id = -1n;
			containerOpen.coordinates = { x: player.inventory.container.blockPosition.x, y: player.inventory.container.blockPosition.y, z: player.inventory.container.blockPosition.z };
			containerOpen.writePacket(player);

			player.inventory.container.isOpen = true;
		};

		/**
		 * Updates an item in a container (if open)
		 *
		 * @param {number} networkId
		 * @param {number} blockRuntimeId
		 * @param {number} slot
		 * @param {number} count
		 * @param {JSON} extra
		 */
		player.setContainerItem = function (networkId, blockRuntimeId, slot = 0, metadata = false, hasStackId = true, stackId = 1, count = 1, extra = { has_nbt: 0, can_place_on: [], can_destroy: [] }) {
			let shouldGiveContainerItem = true;

			Frog.eventEmitter.emit("inventoryContainerGiveItem", {
				player: player,
				itemData: {
					playerInventory: player.inventory,
					networkId,
					blockRuntimeId,
					slot,
					metadata,
					hasStackId,
					stackId,
					count,
					extra,
				},
				server: Frog.getServer(),
				cancel: () => {
					shouldGiveContainerItem = false;
				},
			});

			if (!shouldGiveContainerItem) return;

			let input = [];

			for (let i = 0; i < 27; i++) {
				input.push({ network_id: 0 });
			}

			input[slot] = {
				network_id: networkId,
				count: count,
				metadata: metadata,
				has_stack_id: hasStackId,
				stack_id: stackId,
				block_runtime_id: blockRuntimeId,
				extra: extra,
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
			for (const currentPlayer of PlayerInfo.players) {
				if (currentPlayer.username === player.username) {
					continue;
				}

				const playerList = new PlayerList();
				playerList.type = PlayerListType.REMOVE;
				playerList.uuid = player.profile.uuid;
				playerList.writePacket(currentPlayer);
			}

			player.offline = true;
			GarbageCollector.clearOfflinePlayers();

			Frog.eventEmitter.emit("playerLeave", {
				player,
				server: Frog.getServer(),
			});

			Logger.info(getKey("status.resourcePacks.disconnected").replace("%s%", player.username));

			if (player.initialised) Frog.broadcastMessage(getKey("chat.broadcasts.left").replace("%s%", player.username));
		});
	},
};
