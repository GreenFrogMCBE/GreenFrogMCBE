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
	import { Client, Player as OnlinePlayer, Server } from "frog-protocol"
	import { Socket, RemoteInfo } from "dgram"

	export type Directories = {
		op_file: string,
		config_file: string,
		world_folder: string,
		plugins_folder: string,
		plugin_data_folders: string
		crash_reports_folder: string,
	}

	export type ReleaseData = {
		minor_server_version: string
		major_server_version: string
		version_description: string
		api_version: string
	}

	export type Vec2 = {
		x: number
		z: number
	}

	export type Vec3 = {
		x: number
		y: number
		z: number
	}

	export type QuerySettings = {
		host: string
		port: number
		motd: string
		level_name: string
		players: Player[]
		max_players: number
		gamemode: Gamemode | string
		version: string
		plugins: Plugin[] | string[]
	}

	export type CommandType =
		'int' |
		'float' |
		'value' |
		'wildcard_int' |
		'operator' |
		'command_operator' |
		'target' |
		'wildcard_target' |
		'file_path' |
		'integer_range' |
		'equipment_slot' |
		'string' |
		'block_position' |
		'position' |
		'message' |
		'raw_text' |
		'json' |
		'block_states' |
		'command'

	export type CommandParameters = {
		name: string
		type: CommandType,
		optional: boolean
	}[]

	export type RaknetBackend =
		"raknet-native" |
		"jsp-raknet" |
		"raknet-node"

	export type Config = {
		network: {
			host: string
			port: number
			raknetBackend: RaknetBackend
			packet_rate_limiting: {
				enabled: boolean
				max_packets: number
			}
		}
		server_info: {
			motd: string
			level_name: string
			version: string
			offline_mode: boolean
			max_players: number
		}
		chat: {
			lang: string
			disable: boolean
			commandsDisabled: boolean
			block_invalid_packets: {
				messages: boolean
				commands: boolean
			}
		}
		query: {
			enabled: boolean
			port: number
			show_plugins: boolean
			log: {
				packets: boolean
				connections: boolean
			}
		}
		dev: {
			unstable: boolean
			debug: boolean
			log_unhandled_packets: boolean
			default_permission_level: number
			multi_protocol: boolean
			validate_usernames: boolean
			legacy: {
				use_legacy_version_mismatch_kick_message: boolean
				use_legacy_server_full_kick_message: boolean
			}
			exit_codes: {
				successful: number
				crash: number
			}
		}
		world: {
			name: string
			difficulty: number
			gamemode: {
				player: string
				world: string
			}
			render_distance: {
				client_side: number
				server_side: number
			}
			generators: {
				type: string
				render_distance: {
					server_side: number
					client_side: number
				}
			}
			ticking: {
				event: boolean
				time: boolean
				void: boolean
				regeneration: boolean
				starvation_damage: boolean
				entities: boolean
				speed: number
			}
		}
		performance: {
			garbageCollectorDelay: number
		}
		logger: {
			dateFormat: string
			message_format: string
		}
	}

	export type Language = {
		server: {
			loading: string
			license: string
			shuttingDown: string
		}
		garbageCollector: {
			started: string
			deleted: string
			finished: string
		}
		commands: {
			unknown: string
			errors: {
				internalError: string
				internalErrorPlayer: string
				internalErrorBadSender: string
				syntaxErrorMinArg: string
				syntaxErrorMaxArg: string
				targetErrorTargetsNotFound: string
				targetErrorNotOnline: string
			}
			ingameExecuted: string
			deop: {
				name: string
				description: string
				execution: {
					success: string
					fail: string
				}
			}
			gamemode: {
				name: string
				description: string
				execution: {
					failed: string
					successUpdated: string
					successSet: string
				}
			}
			me: {
				name: string
				description: string
			}
			help: {
				name: string
				description: string
				execution: {
					success: string
					command: string
				}
			}
			kick: {
				name: string
				description: string
				execution: {
					failedNotOnline: string
				}
			}
			kill: {
				name: string
				description: string
			}
			list: {
				name: string
				description: string
				execution: {
					successCommands: string
				}
			}
			op: {
				name: string
				description: string
				execution: {
					success: string
					failed: string
				}
			}
			plugins: {
				name: string
				aliases: {
					pl: string
				}
				description: string
				execution: {
					success: string
				}
			}
			say: {
				name: string
				description: string
			}
			stop: {
				name: string
				description: string
			}
			time: {
				name: string
				description: string
				execution: {
					success: string
					failed: string
				}
				times: {
					day: string
					night: string
				}
			}
			version: {
				name: string
				description: string
				aliases: {
					ver: string
					about: string
				}
			}
			teleport: {
				name: string
				description: string
				aliases: {
					tp: string
				}
				execution: {
					success: string
					successTeleported: string
					failedCoordinatesInvalid: string
				}
			}
			tell: {
				name: string
				description: string
				aliases: {
					w: string
					whisper: string
					msg: string
				}
				execution: {
					success: string
					successWhisper: string
				}
			}
		}
		scoreboard: {
			nameDefault: string
		}
		plugin: {
			loading: {
				failed: string
				loading: string
				loaded: string
				warningInvalidJson: string
			}
			unloading: {
				failed: string
				success: string
				unloading: string
			}
		}
		kickMessages: {
			serverDisconnect: string
			serverClosed: string
			serverFull: string
			invalidPacket: string
			invalidUsername: string
			versionMismatch: string
			resourcePacksRefused: string
			wereKicked: string
			play_status: string
			play_statusConsole: string
		}
		player: {
			kicked: string
		}
		status: {
			resourcePacks: {
				refused: string
				none: string
				installed: string
			}
		}
		warning: {
			custom_items: {
				loadingFailed: string
			}
		}
		debug: {
			debugEnabled: string
			unstable: string
			unstableUnsupported: string
			playerlistInvalid: string
			playerUnsupportedAction: {
				id: string
				block: string
			}
		}
		chat: {
			format: string
			formatMe: string
			formatSay: string
			broadcasts: {
				joined: string
				left: string
			}
		}
		creativeMenu: {
			badPacket: string
		}
		network: {
			packet: {
				unhandledPacket: string
				failed: {
					client_side: string
					server_side: string
				}
			}
			exceptions: {
				rateLimited: string
				packetHandlingError: string
				itemStackRequest: {
					badGamemode: string
				}
				inventoryTransaction: {
					invalid: string
				}
				invalidGamemodePacket: string
			}
			server: {
				listening: {
					success: string
					failed: string
					failedOtherServerRunning: string
				}
				network: {
					generatingToken: string
					invalidPacket: string
					packets: {
						handshake: string
						fullInfo: string
						basicInfo: string
					}
				}
			}
		}
		exceptions: {
			plugin: {
				noName: string
				noVersion: string
			}
			generator: {
				invalid: string
			}
			console: {
				alreadyClosed: string
			}
			logger: {
				invalidType: string
			}
		}
		query: {
			server: {
				listening: string
				listeningFailed: string
				error: string
				network: {
					generatingToken: string
					invalidPacket: string
					packets: {
						handshake: string
						fullInfo: string
						basicInfo: string
					}
				}
			}
		}
		logger: {
			info: string
			warning: string
			error: string
			debug: string
		}
	}

	export type ItemExtraData = {
		has_nbt: boolean
		can_place_on: any[]
		can_destroy: any[]
	}

	export type LastUsedItem = {
		networkId: number
		runtimeId: number
	}

	export type Item = {
		network_id: number
		count?: number
		metadata?: any
		has_stack_id?: boolean
		stack_id?: number
		block_runtime_id?: number
		extra?: ItemExtraData
	}

	export type EntityDataProperties = {
		ints: number[]
		floats: number[]
	}

	export type EntityData = {
		onfire?: boolean
		sneaking?: boolean
		riding?: boolean
		sprinting?: boolean
		action?: boolean
		invisible?: boolean
		tempted?: boolean
		inlove?: boolean
		saddled?: boolean
		powered?: boolean
		ignited?: boolean
		baby?: boolean
		converting?: boolean
		critical?: boolean
		can_show_nametag?: boolean
		always_show_nametag?: boolean
		no_ai?: boolean
		silent?: boolean
		wallclimbing?: boolean
		can_climb?: boolean
		swimmer?: boolean
		can_fly?: boolean
		walker?: boolean
		resting?: boolean
		sitting?: boolean
		angry?: boolean
		interested?: boolean
		charged?: boolean
		tamed?: boolean
		orphaned?: boolean
		leashed?: boolean
		sheared?: boolean
		gliding?: boolean
		elder?: boolean
		moving?: boolean
		breathing?: boolean
		chested?: boolean
		stackable?: boolean
		showbase?: boolean
		rearing?: boolean
		vibrating?: boolean
		idling?: boolean
		evoker_spell?: boolean
		charge_attack?: boolean
		wasd_controlled?: boolean
		can_power_jump?: boolean
		can_dash?: boolean
		linger?: boolean
		has_collision?: boolean
		affected_by_gravity?: boolean
		fire_immune?: boolean
		dancing?: boolean
		enchanted?: boolean
		show_trident_rope?: boolean
		container_private?: boolean
		transforming?: boolean
		spin_attack?: boolean
		swimming?: boolean
		bribed?: boolean
		pregnant?: boolean
		laying_egg?: boolean
		rider_can_pick?: boolean
		transition_sitting?: boolean
		eating?: boolean
		laying_down?: boolean
	}

	export type EntityMovementFlags = {
		has_x: boolean
		has_y: boolean
		has_z: boolean
		has_rot_x?: boolean
		has_rot_y?: boolean
		has_rot_z?: boolean
		on_ground: boolean
		teleport: boolean
		force_move: boolean
	}

	// Only used in the resource_packs_info packet
	export type ResourcePackLink = {
		id: string,
		url: string,
	}

	// Only used in the start_game packet
	export type WorldSeed = [number, number]

	export type PacketData = {
		name: string
		params: object
	}

	export type Packet = {
		data: PacketData
	}

	export type World = {
		name: string
		render_distance: number
		spawn_coordinates: Vec3
		generator: string
		time: number

		place_block(x: number, y: number, z: number, id: number): void
		break_block(x: number, y: number, z: number): void
		send_block_update_packet(player: Player, x: number, y: number, z: number, id: number): void
		tick_hunfer_loss(): void
		start_network_chunk_publisher_packet_sending_loop(): void
		tick(): void
		tickEvent: () => void
		tick_time: () => void
		tick_regeneration: () => void
		tick_starvation_damage: () => void
		tick_void_damage: () => void
		handle_fall_damage(player: Player, position: Vec3): Promise<void>
		emit_event(eventName: string | EntityType): void
		spawn_entity(entity_name: string | EntityType, entity_id: number, x: number, y: number, z: number, yaw?: number, pitch?: number): void
		teleport_entity(entity_id: number, x: number, y: number, z: number, rotation_x?: number, rotation_y?: number, rotation_z?: number): void
		get_world_data(): World
	}

	export type NBTType = "compoud"

	export type NBT = {
		type: NBTType | string
		name: string
		value: any
	}

	export type CommandInfo = {
		name: string
		description: string
	}

	export type CommandOptions = {
		unused: number
		collapse_enum: number
		has_semantic_constraint: number
		as_chained_command: number
		unknown2: number
	}

	export type CommandOverload = {
		parameter_name: string
		value_type: string
		enum_type: string
		optional: boolean
		options: CommandOptions
	}

	export type CommandPacket = {
		values_len: number
		_enum_type: string
		enum_values: any[]
		chained_subcommand_values: any[]
		suffixes: any[]
		enums: any[]
		chained_subcommands: any[]
		command_data: any[]
		dynamic_enums: any[]
		enum_constraints: any[]
	}

	export type CommandConstructor = {
		name: string
		description: string
		aliases?: string[]
		min_args?: number
		max_args?: number
		requires_op?: boolean
	}

	export type ClientSideCommand = {
		chaining: boolean
		__4265: CommandOverload[]
	}

	export type Command = {
		name: string
		description: string
		min_args?: number | undefined
		max_args?: number | undefined
		requires_op?: boolean
		aliases: string[]
		execute(player: Player, server: Server, args: string[]): void
	}

	export type Plugin = {
		name: string
		version: string
	}

	export type ContainerWindow = {
		id: number
		type: string
	}

	export type Container = {
		block_position: Partial<Vec3>
		isOpen: boolean
		window: Partial<ContainerWindow>
	}

	export type Location = {
		on_ground: boolean
		x: number
		y: number
		z: number
		yaw: number
		pitch: number
	}

	export type Feature = {
		name: string
		options: string
	}

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
		"§r"

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
		"§u"

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
		"amethyst"

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
		"minecraft:amethyst_shard"

	export type TrimMaterial = {
		material: TrimMaterialName | string
		color: TrimMaterialColor | string
		item_name: TrimMaterialItem | string
	}

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
		"host"

	export type TrimPattern = {
		item_name: TrimPatternItemName | string
		pattern: TrimPatternName
	}

	export type LogMessage = {
		console_logging_level: LogLevel
		level_name: string
		message: string
		color: number
	}

	export type FormAction = {
		type: string
		text: string
		placeholder?: string
		options?: any
		min?: number
		max?: number
		step?: number
	}

	export type FormButton = {
		text: string
		image?: {
			type: string
			data: string
		}
	}

	export type ConsoleColors = {
		[key: string]: string
	}

	export type ProtocolList = {
		[key: string]: number
	}

	export type LogLevel =
		"debug" |
		"info" |
		"warn" |
		"error"

	export type EntityAttributeName =
		"minecraft:luck" |
		"minecraft:health" |
		"minecraft:absorption" |
		"minecraft:movement" |
		"minecraft:underwater_movement" |
		"minecraft:lava_movement"

	export type EntityAttribute = {
		name: EntityAttributeName
		min: number
		value: number
		max: number
	}

	export type EntityMetadataKey =
		"flags" |
		"health" |
		"variant" |
		"color" |
		"nametag" |
		"owner_eid" |
		"target_eid" |
		"air" |
		"potion_color" |
		"potion_ambient" |
		"jump_duration" |
		"charge_amount" |
		"lead_holder_eid" |
		"scale" |
		"interactive_tag" |
		"max_airdata_max_air" |
		"mark_variant" |
		"container_type" |
		"container_base_size" |
		"container_extra_slots_per_strength" |
		"boundingbox_width" |
		"boundingbox_height" |
		"rider_seat_position" |
		"rider_rotation_locked" |
		"rider_max_rotation" |
		"rider_min_rotation" |
		"rider_rotation_offset" |
		"has_command_block" |
		"command_block_command" |
		"command_block_last_output" |
		"command_block_track_output" |
		"controlling_rider_seat_number" |
		"strength" |
		"max_strength" |
		"spell_casting_color" |
		"limited_life" |
		"always_show_nametag" |
		"color_2" |
		"eating_counter" |
		"flags_extended" |
		"trade_tier" |
		"max_trade_tier" |
		"trade_experience" |
		"skin_id" |
		"command_block_tick_delay" |
		"command_block_execute_on_first_tick" |
		"ambient_sound_interval" |
		"ambient_sound_interval_range" |
		"ambient_sound_event_name" |
		"fall_damage_multiplier" |
		"can_ride_target" |
		"low_tier_cured_discount" |
		"high_tier_cured_discount" |
		"nearby_cured_discount" |
		"nearby_cured_discount_timestamp" |
		"hitbox" |
		"is_buoyant" |
		"base_runtime_id" |
		"update_properties" |
		"movement_sound_distance_offset" |
		"heartbeat_interval_ticks"

	export type EntityMetadataType =
		"long" |
		"int" |
		"byte" |
		"string" |
		"short" |
		"float" |
		"vec3f" |
		"compound"

	export type EntityMetadataValue =
		string |
		number |
		object

	export type EntityMetadata = {
		key: EntityMetadataKey,
		type: EntityMetadataType,
		value: EntityMetadataValue
	}

	export type ValueOf<T> = T[keyof T]

	export type DamageCause = ValueOf<typeof import("./src/player/types/DamageCause")>
	export type HungerCause = ValueOf<typeof import("./src/player/types/HungerCause")>

	export type BlockBreakEvent = {
		player: Player
		action: BlockAction
		position: any
		result_position: any
		face: number
	}

	export type InventoryContainerChestRemoveEvent = {
		player: Player
		cancel(): void
	}

	export type InventoryPostsItemRequestEvent = {
		count: number
		network_id: number
		block_runtime_id: number
		inventoryItems: Item[]
	}

	export type InventoryPreItemRequestEvent = {
		count: number
		network_id: number
		block_runtime_id: number
		cancel(): void
	}

	export type PacketQueueEvent = {
		player: Player
		packet: {
			data: PacketData
		}
		cancel(): void
	}

	export type PacketReadErrorEvent = {
		player: Player
		error: Error
	}

	export type PacketReadEvent = {
		player: Player
		packet: {
			packet: PacketData
			instance: Packet
		}
		cancel(): void
	}

	export type PacketRateLimitEvent = {
		player: Player
	}

	export type PlayerAttributeEvent = {
		player: Player
		attribute: any
		cancel(): void
	}

	export type PlayerChatEvent = {
		player: Player
		message: string
		cancel(): void
	}

	export type PlayerCommandEvent = {
		player: Player
		args: string[]
		command: string
		cancel(): void
	}

	export type PlayerContainerCloseEvent = {
		player: Player
		window_id: WindowId
		sent_by_server: boolean
		packet: Packet
		cancel(): void
	}

	export type PlayerContainerOpenEvent = {
		player: Player
		window_id: WindowId
		windowType: WindowType
		sent_by_server: boolean
		runtimeId: number
		containerCoordinates: Vec3
		cancel(): void
	}

	export type PlayerDeathEvent = {
		player: Player
	}

	export type PlayerFallDamageEvent = {
		player: Player
		health: number
		cause: DamageCause
	}

	export type PlayerFormResponseEvent = {
		player: Player
		packet: Packet
	}

	export type PlayerGamemodeChangeRequestEvent = {
		player: Player
		gamemode: Gamemode
		cancel(): void
	}

	export type PlayerHungerUpdateEvent = {
		player: Player
		hunger: number
		cause: HungerCause
		cancel(): void
	}

	export type PlayerKillEvent = {
		player: Player
		cancel(): void
	}

	export type PlayerLeaveEvent = {
		player: Player
	}

	export type PlayerMalformatedChatCommand = {
		player: Player
		command: string
	}

	export type PlayerMoveEvent = {
		player: Player
		x: number
		y: number
		z: number
		pitch: number
		yaw: number
		on_ground: boolean
		cancel(): void
	}

	export type PlayerOpStatusChangeEvent = {
		username: string
		status: boolean
		cancel(): void
	}

	export type PlayerPlayStatusEvent = {
		player: Player
		play_status: PlayStatus
		terminate_connection: boolean
		cancel(): void
	}

	export type PlayerPreConnectEvent = {
		player: Player
		cancel(): void
	}

	export type PlayerRegenerateEvent = {
		player: Player
		health: number
		cause: DamageCause
	}

	export type PlayerRequestChunkRadiusEvent = {
		radius: number
		player: Player
		cancel(): void
	}

	export type PlayerSetAttributeEvent = {
		player: Player
		attribute: any
		cancel(): void
	}

	export type PlayerSetDifficultyEvent = {
		player: Player
		difficulty: Difficulty
		cancel(): void
	}

	export type PlayerSetDifficultyRequest = {
		player: Player
		difficulty: Difficulty
		cancel(): void
	}

	export type PlayerSpawnEvent = {
		player: Player
	}

	export type PlayerTeleportEvent = {
		player: Player
		x: number
		y: number
		z: number
		rotation_x: number | undefined
		rotation_y: number | undefined
		rotation_z: number | undefined
		cancel(): void
	}

	export type PlayerTransferEvent = {
		player: Player
		port: number
		address: string
		cancel(): void
	}

	export type QueryErrorEvent = {
		socket: Socket
		querySettings: QuerySettings
		error: Error
		cancel(): void
	}

	export type QueryInvalidPacketEvent = {
		client: RemoteInfo
		packet: Buffer
	}

	export type QueryListenEvent = {
		socket: Socket
		settings: QuerySettings
		packet: Buffer
		client: RemoteInfo
		cancel(): void
	}

	export type QueryPacketEvent = {
		socket: Socket
		settings: QuerySettings
		packet: Buffer
		client: RemoteInfo
		cancel(): void
	}

	export type ServerChatEvent = {
		player: Player
		message: string
		cancel(): void
	}

	export type ServerCommandExecuteEvent = {
		args: string[]
		command: string
		cancel(): void
	}

	export type ServerCommandProcessEvent = {
		command: string
		cancel(): void
	}

	export type ServerCommandsInitializeEvent = {}

	export type ServerCriticalErrorEvent = {
		error: Error
	}

	export type ServerGamemodeChangeEvent = {
		player: Player
		gamemode: Gamemode
		cancel(): void
	}

	export type ServerGarbageCollectionEvent = {}

	export type ServerListenEvent = {}

	export type ServerLogMessageEvent = {
		console_logging_level: LogLevel
		level_name: string
		message: string
		color: number
		cancel(): void
	}

	export type ServerMessageEvent = {
		player: Player
		message: string
		cancel(): void
	}

	export type ServerOfflinePlayersGarbageCollectionEvent = {}

	export type ServerRegenerationTickEvent = {
		world: World
	}

	export type ServerSetDimensionEvent = {
		player: Player
		dimension: Dimension
		coordinates: Vec3
		respawn: boolean
		cancel(): void
	}

	export type ServerSetEntityDataEvent = {
		player: Player
		data: EntityData | any
		cancel(): void
	}

	export type ServerSetHealthEvent = {
		player: Player
		health: number
		cause: DamageCause
		cancel(): void
	}

	export type ServerShutdownEvent = {
		cancel(): void
	}

	export type ServerSpeedUpdateEvent = {
		speed: number
		cancel(): void
	}

	export type ServerStarvationDamageTickEvent = {
		world: World
	}

	export type ServerTickEvent = {
		world: World
	}

	export type ServerTimeTickEvent = {
		world: World
	}

	export type ServerTimeUpdateEvent = {
		player: Player
		time: number
		cancel(): void
	}

	export type ServerToastEvent = {
		player: Player
		message: string
		title: string
		cancel(): void
	}

	export type ServerUpdateChunkRadiusEvent = {
		player: Player
		radius: number
		cancel(): void
	}

	export type ServerVelocityUpdateEvent = {
		player: Player
		coordinates: Vec3
		cancel(): void
	}

	export type ServerVoidDamageTickEvent = {
		world: World
	}

	export type ServerSetDifficultyEvent = {
		player: Player
		difficulty: Difficulty
		cancel(): void
	}

	export type WorldGenerateEvent = {
		player: Player
		cancel(): void
	}

	export type EntitySpawnEvent = {
		entity_name: string | EntityType
		entity_id: number
		x: number
		y: number
		z: number
		yaw: number
		pitch: number
		cancel(): void
	}

	export type EntityTeleportEvent = {
		entity_id: number
		x: number
		y: number
		z: number
		rotation_x: number
		rotation_y: number
		rotation_z: number
		cancel(): void
	}

	export type EntityRemoveEvent = {
		entity_id: number
		cancel(): void
	}

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
		| "inventoryPreItemRequest"
		| "inventoryPostItemRequest"
		| "packetRead"
		| "packetReadError"
		| "packetRateLimit"
		| "packetQueue"
		| "serverShutdown"
		| "serverTick"
		| "serverSetDimension"
		| "serverGarbageCollection"
		| "serverOfflinePlayersGarbageCollection"
		| "serverMessage"
		| "serverChat"
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
		| "serverCommand"
		| "serverCommandsInitialize"
		| "serverVelocityUpdate"
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
		| "playerRequestChunkRadius"
		| "playerContainerClose"
		| "playerInteract"
		| "playerFormResponse"
		| "playerGamemodeChangeRequest"
		| "playerSpawn"
		| "playerChat"
		| "playerMove"
		| "playerCommand"
		| "playerPlayStatus"
		| "playerTeleport"
		| "playerKill"
		| "entitySpawnEvent"
		| "entityTeleportEvent"
		| "entityRemoveEvent"
}
