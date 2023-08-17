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
declare module "Frog" {
	import { Client, Player as OnlinePlayer, Server } from "frog-protocol";

	export type ReleaseData = {
		minorServerVersion: string;
		majorServerVersion: string;
		versionDescription: string;
		apiVersion: string;
	};

	export type Coordinate = {
		x: number;
		y: number;
		z: number;
	};

	export type Rotation = {
		x: number;
		z: number;
	};

	export type Directories = {
		plugins: string;
		pluginData: string;
		fullPluginPath: string;
		getFile: (file: string) => string;
	};

	export type QuerySettings = {
		host: string;
		port: number;
		motd: string;
		levelName: string;
		players: Player[];
		maxPlayers: number;
		gamemode: Gamemode;
		wl: boolean;
		version: string;
		plugins: Plugin[] | string[];
	};

	export type Config = {
		network: {
			host: string;
			port: number;
			packetRateLimting: {
				enabled: boolean;
				maxPackets: number;
			};
		};
		serverInfo: {
			motd: string;
			levelName: string;
			version: string;
			offlineMode: boolean;
			maxPlayers: number;
		};
		chat: {
			lang: string;
			disable: boolean;
			commandsDisabled: boolean;
			blockInvalidPackets: {
				messages: boolean;
				commands: boolean;
			};
		};
		query: {
			enabled: boolean;
			port: number;
			showPlugins: boolean;
			log: {
				packets: boolean;
				connections: boolean;
			};
		};
		dev: {
			unstable: boolean;
			debug: boolean;
			logUnhandledPackets: boolean;
			defaultPermissionLevel: number;
			multiProtocol: boolean;
			validateUsernames: boolean;
			legacy: {
				useLegacyVersionMismatchKickMessage: boolean;
				useLegacyServerFullKickMessage: boolean;
			};
			exitCodes: {
				exit: number;
				crash: number;
			};
		};
		world: {
			name: string;
			difficulty: number;
			gamemode: {
				player: string;
				world: string;
			};
			generators: {
				type: string;
				renderDistance: {
					serverSide: number;
					clientSide: number;
				};
			};
			ticking: {
				event: boolean;
				worldTime: boolean;
				void: boolean;
				regeneration: boolean;
				starvationDamage: boolean;
				speed: number;
			};
		};
		performance: {
			garbageCollectorDelay: number;
		};
	};

	export interface Language extends String {
		server: {
			loading: string;
			license: string;
			shuttingDown: string;
		};
		garbageCollector: {
			started: string;
			deleted: string;
			finished: string;
		};
		commands: {
			unknown: string;
			errors: {
				internalError: string;
				internalErrorPlayer: string;
				internalErrorBadSender: string;
				syntaxErrorMinArg: string;
				syntaxErrorMaxArg: string;
				targetErrorTargetsNotFound: string;
				targetErrorNotOnline: string;
			};
			ingameExecuted: string;
			deop: {
				name: string;
				description: string;
				execution: {
					success: string;
					fail: string;
				};
			};
			gamemode: {
				name: string;
				description: string;
				execution: {
					failed: string;
					successUpdated: string;
					successSet: string;
				};
			};
			me: {
				name: string;
				description: string;
			};
			help: {
				name: string;
				description: string;
				execution: {
					success: string;
					command: string;
				};
			};
			kick: {
				name: string;
				description: string;
				execution: {
					failedNotOnline: string;
				};
			};
			kill: {
				name: string;
				description: string;
			};
			list: {
				name: string;
				description: string;
				execution: {
					successCommands: string;
				};
			};
			op: {
				name: string;
				description: string;
				execution: {
					success: string;
					failed: string;
				};
			};
			plugins: {
				name: string;
				aliases: {
					pl: string;
				};
				description: string;
				execution: {
					success: string;
				};
			};
			say: {
				name: string;
				description: string;
			};
			stop: {
				name: string;
				description: string;
			};
			time: {
				name: string;
				description: string;
				execution: {
					success: string;
					failed: string;
				};
				times: {
					day: string;
					night: string;
				};
			};
			version: {
				name: string;
				description: string;
				aliases: {
					ver: string;
					about: string;
				};
			};
			teleport: {
				name: string;
				description: string;
				aliases: {
					tp: string;
				};
				execution: {
					success: string;
					successTeleported: string;
					failedCoordinatesInvalid: string;
				};
			};
			tell: {
				name: string;
				description: string;
				aliases: {
					w: string;
					whisper: string;
					msg: string;
				};
				execution: {
					success: string;
					successWhisper: string;
				};
			};
		};
		scoreboard: {
			nameDefault: string;
		};
		plugin: {
			loading: {
				failed: string;
				loading: string;
				loaded: string;
				warningInvalidJson: string;
			};
			unloading: {
				failed: string;
				success: string;
				unloading: string;
			};
		};
		kickMessages: {
			serverDisconnect: string;
			serverClosed: string;
			serverFull: string;
			invalidPacket: string;
			invalidUsername: string;
			versionMismatch: string;
			resourcePacksRefused: string;
			wereKicked: string;
			playStatus: string;
			playStatusConsole: string;
		};
		player: {
			kicked: string;
		};
		status: {
			resourcePacks: {
				refused: string;
				none: string;
				installed: string;
			};
		};
		warning: {
			customItems: {
				loadingFailed: string;
			};
		};
		debug: {
			debugEnabled: string;
			unstable: string;
			unstableUnsupported: string;
			playerlistInvalid: string;
			playerUnsupportedAction: {
				id: string;
				block: string;
			};
		};
		chat: {
			format: string;
			formatPlugin: string;
			formatMe: string;
			formatSay: string;
			broadcasts: {
				joined: string;
				left: string;
			};
		};
		creativeMenu: {
			badPacket: string;
		};
		network: {
			packet: {
				unhandledPacket: string;
				failed: {
					clientSide: string;
					serverSide: string;
				};
			};
			exceptions: {
				rateLimited: string;
				packetHandlingError: string;
				itemStackRequest: {
					badGamemode: string;
				};
				inventoryTransaction: {
					invalid: string;
				};
				invalidGamemodePacket: string;
			};
			server: {
				listening: {
					success: string;
					failed: string;
					failedOtherServerRunning: string;
				};
				network: {
					generatingToken: string;
					invalidPacket: string;
					packets: {
						handshake: string;
						fullInfo: string;
						basicInfo: string;
					};
				};
			};
		};
		exceptions: {
			plugin: {
				noName: string;
				noVersion: string;
			};
			generator: {
				invalid: string;
			};
			console: {
				alreadyClosed: string;
			};
			logger: {
				invalidType: string;
			};
		};
		query: {
			server: {
				listening: string;
				listeningFailed: string;
				error: string;
				network: {
					generatingToken: string;
					invalidPacket: string;
					packets: {
						handshake: string;
						fullInfo: string;
						basicInfo: string;
					};
				};
			};
		};
		logger: {
			info: string;
			warning: string;
			error: string;
			debug: string;
		};
	}

	export type ItemExtraData = {
		has_nbt: boolean;
		can_place_on: any[];
		can_destroy: any[];
	};

	export type LastUsedItem = {
		networkId: number;
		runtimeId: number;
	};

	export type Item = {
		network_id: number;
		count?: number;
		metadata?: any;
		has_stack_id?: boolean;
		stack_id?: number;
		block_runtime_id?: number;
		extra?: ItemExtraData;
	};

	export type EntityDataProperties = {
		ints: number[];
		floats: number[];
	};

	export type EntityData = {
		onfire?: boolean;
		sneaking?: boolean;
		riding?: boolean;
		sprinting?: boolean;
		action?: boolean;
		invisible?: boolean;
		tempted?: boolean;
		inlove?: boolean;
		saddled?: boolean;
		powered?: boolean;
		ignited?: boolean;
		baby?: boolean;
		converting?: boolean;
		critical?: boolean;
		can_show_nametag?: boolean;
		always_show_nametag?: boolean;
		no_ai?: boolean;
		silent?: boolean;
		wallclimbing?: boolean;
		can_climb?: boolean;
		swimmer?: boolean;
		can_fly?: boolean;
		walker?: boolean;
		resting?: boolean;
		sitting?: boolean;
		angry?: boolean;
		interested?: boolean;
		charged?: boolean;
		tamed?: boolean;
		orphaned?: boolean;
		leashed?: boolean;
		sheared?: boolean;
		gliding?: boolean;
		elder?: boolean;
		moving?: boolean;
		breathing?: boolean;
		chested?: boolean;
		stackable?: boolean;
		showbase?: boolean;
		rearing?: boolean;
		vibrating?: boolean;
		idling?: boolean;
		evoker_spell?: boolean;
		charge_attack?: boolean;
		wasd_controlled?: boolean;
		can_power_jump?: boolean;
		can_dash?: boolean;
		linger?: boolean;
		has_collision?: boolean;
		affected_by_gravity?: boolean;
		fire_immune?: boolean;
		dancing?: boolean;
		enchanted?: boolean;
		show_trident_rope?: boolean;
		container_private?: boolean;
		transforming?: boolean;
		spin_attack?: boolean;
		swimming?: boolean;
		bribed?: boolean;
		pregnant?: boolean;
		laying_egg?: boolean;
		rider_can_pick?: boolean;
		transition_sitting?: boolean;
		eating?: boolean;
		laying_down?: boolean;
	};

	export type EntityMovementFlags = {
		has_x: boolean;
		has_y: boolean;
		has_z: boolean;
		has_rot_x?: boolean;
		has_rot_y?: boolean;
		has_rot_z?: boolean;
		on_ground: boolean;
		teleport: boolean;
		force_move: boolean;
	};

	export type Attribute = any; // Temp

	export type PacketParams = any;

	export type PacketData = {
		name: string;
		params: PacketParams;
	};

	export type Packet = {
		data: PacketData;
	};

	export type WorldSeed = [number, number]; // Only used in the start_game packet

	export type World = {
		name: string;
		renderDistance: number;
		spawnCoordinates: Coordinate;
		generator: string;
		time: number;
		handleFallDamage(player: Player, coordinates: Coordinate): void;
		breakBlock(x: number, y: number, z: number): void;
		placeBlock(x: number, y: number, z: number, runtime_id: number): void;
	};

	export type NBTType = "compoud";

	export type NBT = {
		type: NBTType | string;
		name: string;
		value: any;
	};

	export type CommandInfo = {
		name: string;
		description: string;
	};

	export type CommandOptions = {
		unused: number;
		collapse_enum: number;
		has_semantic_constraint: number;
		as_chained_command: number;
		unknown2: number;
	};

	export type CommandOverload = {
		parameter_name: string;
		value_type: string;
		enum_type: string;
		optional: boolean;
		options: CommandOptions;
	};

	export type CommandPacket = {
		values_len: number;
		_enum_type: string;
		enum_values: any[];
		chained_subcommand_values: any[];
		suffixes: any[];
		enums: any[];
		chained_subcommands: any[];
		command_data: any[];
		dynamic_enums: any[];
		enum_constraints: any[];
	};

	export type CommandConstructor = {
		name: string;
		description: string;
		aliases?: string[];
		minArgs?: number;
		maxArgs?: number;
		requiresOp?: boolean;
	};

	export type Command = {
		chaining: boolean;
		__4265: CommandOverload[];
	};

	export type Plugin = {
		name: string;
		version: string;
	};

	export type ContainerWindow = {
		id: number;
		type: string;
	};

	export type Container = {
		blockPosition: Partial<Coordinate>;
		isOpen: boolean;
		window: Partial<ContainerWindow>;
	};

	export type Location = {
		onGround: boolean;
		x: number;
		y: number;
		z: number;
		yaw: number;
		pitch: number;
	};

	export type Feature = {
		name: string;
		options: string;
	};

	export type Color =
		"§0" |
		"§1" |
		"§2" |
		"§3" |
		"§4" |
		"§5" |
		"§6" |
		"§7" |
		"§8" |
		"§9" |
		"§a" |
		"§b" |
		"§c" |
		"§d" |
		"§e" |
		"§f" |
		"§g" |
		"§k" |
		"§l" |
		"§o" |
		"§r";

	export type TrimMaterialColor =
		"§h" |
		"§i" |
		"§j" |
		"§m" |
		"§n" |
		"§p" |
		"§q" |
		"§s" |
		"§t" |
		"§u";

	export type TrimMaterialName =
		"quartz" |
		"iron" |
		"netherite" |
		"redstone" |
		"copper" |
		"gold" |
		"emerald" |
		"diamond" |
		"lapis" |
		"amethyst";

	export type TrimMaterialItem =
		"minecraft:quartz" |
		"minecraft:iron_ingot" |
		"minecraft:netherite_ingot" |
		"minecraft:redstone" |
		"minecraft:copper_ingot" |
		"minecraft:gold_ingot" |
		"minecraft:emerald" |
		"minecraft:diamond" |
		"minecraft:lapis_lazuli" |
		"minecraft:amethyst_shard";

	export type TrimMaterial = {
		material: TrimMaterialName | string;
		color: TrimMaterialColor | string;
		item_name: TrimMaterialItem | string;
	};

	export type TrimPatternItemName =
		"minecraft:ward_armor_trim_smithing_template" |
		"minecraft:sentry_armor_trim_smithing_template" |
		"minecraft:snout_armor_trim_smithing_template" |
		"minecraft:dune_armor_trim_smithing_template" |
		"minecraft:spire_armor_trim_smithing_template" |
		"minecraft:tide_armor_trim_smithing_template" |
		"minecraft:wild_armor_trim_smithing_template" |
		"minecraft:rib_armor_trim_smithing_template" |
		"minecraft:coast_armor_trim_smithing_template" |
		"minecraft:shaper_armor_trim_smithing_template" |
		"minecraft:eye_armor_trim_smithing_template" |
		"minecraft:vex_armor_trim_smithing_template" |
		"minecraft:silence_armor_trim_smithing_template" |
		"minecraft:wayfinder_armor_trim_smithing_template" |
		"minecraft:raiser_armor_trim_smithing_template" |
		"minecraft:host_armor_trim_smithing_template"

	export type TrimPatternName =
		"ward" |
		"sentry" |
		"snout" |
		"dune" |
		"spire" |
		"tide" |
		"wild" |
		"rib" |
		"coast" |
		"shaper" |
		"eye" |
		"vex" |
		"silence" |
		"wayfinder" |
		"raiser" |
		"host";

	export type TrimPattern = {
		item_name: TrimPatternItemName | string;
		pattern: TrimPatternName;
	};

	export type LogMessage = {
		langString: string;
		color: number;
		message: string;
		type: string;
	};

	export interface FormAction {
		type: string;
		text: string;
		placeholder?: string;
		options?: any;
		min?: number;
		max?: number;
		step?: number;
	}

	export type FormButton = {
		text: string;
		image?: {
			type: string;
			data: string;
		};
	};

	export type ValueOf<T> = T[keyof T];

	export type WorldGenerator = ValueOf<import("./src/world/types/WorldGenerator")>;
	export type DimensionLegacy = ValueOf<import("./src/world/types/DimensionId")>;
	export type BlockAction = ValueOf<import("./src/world/types/BlockAction")>;
	export type Dimension = ValueOf<import("./src/world/types/Dimension")>;
	export type Generator = ValueOf<import("./src/world/types/Generator")>;
	export type Interact = ValueOf<import("./src/world/types/Interact")>;
	export type Biome = ValueOf<import("./src/world/types/Biome")>;

	export type Transaction = ValueOf<import("./src/inventory/types/Transaction")>;
	export type WindowType = ValueOf<import("./src/inventory/types/WindowType")>;
	export type WindowId = ValueOf<import("./src/inventory/types/WindowId")>;

	export type Action = ValueOf<import("./src/forms/types/Action")>;
	export type Form = ValueOf<import("./src/forms/types/Form")>;

	export type CreteriaName = ValueOf<import("./src/scoreboard/types/CreteriaName")>;
	export type DisplaySlot = ValueOf<import("./src/scoreboard/types/DisplaySlot")>;
	export type ScoreAction = ValueOf<import("./src/scoreboard/types/ScoreAction")>;
	export type EntryType = ValueOf<import("./src/scoreboard/types/EntryType")>;

	export type DamageCause = ValueOf<import("./src/player/types/DamageCause")>;
	export type HungerCause = ValueOf<import("./src/player/types/HungerCause")>;
	export type Gamemode = ValueOf<import("./src/player/types/Gamemode")>;
	export type Title = ValueOf<import("./src/player/types/Title")>;
	export type Text = ValueOf<import("./src/player/types/Text")>;

	export type Difficulty = ValueOf<import("./src/server/types/Difficulty")>;

	export type MovementAuthority = ValueOf<import("./src/network/packets/types/MovementAuthority")>;
	export type PlayListAction = ValueOf<import("./src/network/packets/types/PlayerListAction")>;
	export type PlayStatus = ValueOf<import("./src/network/packets/types/PlayStatus")>;
	export type DimensionId = ValueOf<import("./src/world/types/DimensionId")>;

	export type PermissionLevel = ValueOf<import("./src/permission/PermissionLevel")>;

	export type PlayerSetDifficultyEvent = {
		player: Player;
		difficulty: Difficulty;
		cancel(): void;
	};

	export type PlayerGamemodeChangeRequestEvent = {
		player: Player;
		gamemode: Gamemode;
		cancel(): void;
	};

	export type PlayerChatEvent = {
		player: Player;
		message: string;
		cancel(): void;
	};

	export type PlayerCommandEvent = {
		player: Player;
		args: string[];
		command: string;
		cancel(): void;
	};

	export type PlayerMalformatedChatCommand = {
		player: Player;
		command: string;
	};

	export type PlayerRequestChunkRadiusEvent = {
		radius: number;
		player: Player;
		cancel(): void;
	};

	export type PlayerMoveEvent = {
		player: Player;
		x: number;
		y: number;
		z: number;
		pitch: number;
		yaw: number;
		onGround: boolean;
		cancel(): void;
	};

	export type PlayerModalFormResponseEvent = {
		player: Player;
		packet: Packet;
	};

	export type PlayerContainerOpenEvent = {
		player: Player;
		windowId: WindowId;
		windowType: WindowType;
		sentByServer: boolean;
		runtimeId: number;
		containerCoordinates: Coordinate;
		cancel(): void;
	};

	export type PlayerContainerCloseEvent = {
		player: Player;
		windowId: WindowId;
		sentByServer: boolean;
		packet: Packet;
		cancel(): void;
	};

	export type PlayerSetDifficultyRequest = {
		player: Player;
		difficulty: Difficulty;
		cancel(): void;
	};

	export type PlayerHasNoResourcePacksInstalledEvent = {
		player: Player;
		resourcePacksIds: any[];
		resourcePacksRequired: boolean;
	};

	export type PlayerResourcePacksRefusedEvent = {
		player: Player;
		cancel(): void;
	};

	export type PlayerHasAllTheResourcePacksEvent = {
		player: Player;
		cancel(): void;
	};

	export type PlayerResourcePacksCompletedEvent = {
		player: Player;
		cancel(): void;
	};

	export type PlayerSpawnEvent = {
		player: Player;
	};

	export type PlayerOpStatusChangeEvent = {
		username: string;
		cancel(): void;
	};

	export type PlayerKillEvent = {
		player: Player;
		cancel(): void;
	};

	export type PlayerTeleportEvent = {
		player: Player;
		x: number;
		y: number;
		z: number;
		rotation_x: number | undefined;
		rotation_y: number | undefined;
		rotation_z: number | undefined;
		cancel(): void;
	};

	export type PlayerTransferEvent = {
		player: Player;
		port: number;
		address: string;
		cancel(): void;
	};

	export type ServerGamemodeChangeEvent = {
		player: Player;
		gamemode: Gamemode;
		cancel(): void;
	};

	export type ServerMessageEvent = {
		player: Player;
		message: string;
		cancel(): void;
	};

	export type ServerChatAsPlayerEvent = {
		player: Player;
		message: string;
		cancel(): void;
	};

	export type ServerCommandProcessErrorEvent = {
		command: string;
		error: Error;
	};

	export type ServerCommandExecuteEvent = {
		args: string[];
		command: string;
		cancel(): void;
	};

	export type ServerToastEvent = {
		player: Player;
		message: string;
		title: string;
		cancel(): void;
	};

	export type ServerTitleEvent = {
		fadeInTime: number;
		fadeOutTime: number;
		stayTime: number;
		text: number;
		type: number;
		cancel(): void;
	};

	export type InventoryContainerChestRemovalEvent = {
		player: Player;
		cancel(): void;
	};

	export type Event =
		| "blockBreak"
		| "queryListen"
		| "queryPacket"
		| "queryInvalidPacket"
		| "queryError"
		| "worldGenerate"
		| "scoreboardCreate"
		| "scoreboardSetScore"
		| "scoreboardScoreDelete"
		| "scoreboardDelete"
		| "inventoryContainerPreCreate"
		| "inventoryContainerCreate"
		| "inventoryContainerChestRemove"
		| "inventoryContainerGiveItem"
		| "inventoryContainerItemRequest"
		| "inventoryPreItemRequest"
		| "inventoryPostItemRequest"
		| "packetRead"
		| "packetReadError"
		| "packetRateLimit"
		| "packetQueue"
		| "serverShutdown"
		| "serverTick"
		| "serverTimeTick"
		| "serverRegenerationTick"
		| "serverStarvationDamageTick"
		| "serverVoidDamageTick"
		| "serverSetDimension"
		| "serverGarbageCollection"
		| "serverOfflinePlayersGarbageCollection"
		| "serverMessage"
		| "serverChatAsPlayer"
		| "serverGamemodeChange"
		| "serverToast"
		| "serverTitle"
		| "serverCommandProcess"
		| "serverCommandProcessError"
		| "serverLogMessage"
		| "serverSetEntityData"
		| "serverUpdateChunkRadius"
		| "serverTimeUpdate"
		| "serverSetDifficulty"
		| "serverCommandExecute"
		| "serverCommandsInitialize"
		| "serverVelocityUpdate"
		| "serverSetXP"
		| "serverSetHealth"
		| "serverSpeedUpdate"
		| "serverCriticalError"
		| "serverStart"
		| "serverListen"
		| "playerFallDamage"
		| "playerRegenerate"
		| "playerDeath"
		| "playerHungerUpdate"
		| "playerHealthUpdate"
		| "playerLeave"
		| "playerSetDifficulty"
		| "playerSetAttribute"
		| "playerTransfer"
		| "playerKick"
		| "playerJoin"
		| "playerPreConnect"
		| "playerContainerOpen"
		| "playerOpStatusChange"
		| "playerOfflineOpStatusChange"
		| "playerRequestChunkRadius"
		| "playerContainerClose"
		| "playerInteract"
		| "playerFormResponse"
		| "playerHasAllTheResourcePacks"
		| "playerResourcePacksRefused"
		| "playerHasNoResourcePacksInstalled"
		| "playerMalformatedChatCommand"
		| "playerResourcePacksCompleted"
		| "playerGamemodeChangeRequest"
		| "playerSpawn"
		| "playerChat"
		| "playerMove"
		| "playerDeath"
		| "playerRegenerate"
		| "playerFallDamage"
		| "playerMalformedChatMessage"
		| "playerMalformedChatCommand"
		| "playerItemStackRequest"
		| "playerCommand"
		| "playerPlayStatus"
		| "playerTeleport"
		| "playerKill";


	export type Test = {
		test(): void;
	}

	export interface EventEmitter {
		on(eventName: Event, listener?: any): void;

		once(eventName: Event, listener?: any): void;
		emit(eventName: Event, listener?: any): void;
	}

	export interface Messagable {
		sendMessage(message: string): void;
	}

	export type Player = Client & OnlinePlayer & Messagable & {
		username: string;
		gamemode: string;
		health: number;
		hunger: number;
		dead: boolean;
		world: World;
		renderChunks: boolean;
		initialised: boolean;
		offline: boolean;
		isConsole: boolean;
		inventory: {
			container: Container;
			items: any[];
			lastUsedItem: LastUsedItem;
		};
		location: Location;
		network: {
			address: string;
			port: string;
			packetCount: number;
			offline: boolean;
			initialised: boolean;
			protocolVersion: number;
		};
		permissions: {
			op: boolean;
			permissionLevel: number;
		};
		_damage: {
			fall: {
				queue: number;
				invulnerable: boolean;
			};
			void: {
				invulnerable: boolean;
			};
		};
		commands: CommandPacket;
		kick(reason: string): void;
		kill(cause: any): void;
		chat(message: string): void;
		teleport(x: number, y: number, z: number, rot_x?: number, rot_y?: number, rot_z?: number): void;
		transfer(address: string, port: number): void;
		setXP(xp: number): void;
		setTime(time: number): void;
		setGamemode(gamemode: string): void;
		setVelocity(x: number, y: number, z: number): void;
		setDifficulty(difficulty: string): void;
		setEntityData(data: EntityData): void;
		setChunkRadius(chunkRadius: number): void;
		setAttribute(setAttribute: Attribute): void;
		setHealth(health: number, cause?: DamageCause): void;
		setHunger(health: number, cause?: HungerCause): void;
		setDimension(x: number, y: number, z: number, dimension: string, respawn?: boolean): void;
		setSpeed(speed: number): void;
		setOp(status: boolean): void;
		sendPlayStatus(playStatus: PlayStatus, terminateConnection?: boolean): void;
		openContainer(): void;
		setContainerItem(itemId: number, blockRuntimeId: number, slot: number, metadata: boolean, hasStackId: boolean, stackId: number, count: number, extra: ItemExtraData): void;
		_queue(packetName: string, packetData: any): void;
	}
}
