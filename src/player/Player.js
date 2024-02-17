const {
	Vec3,
	WorldGenerationType,
	PermissionLevel,
	DisconnectionMessage,
	Attribute,
	PlayerListAction, Text,
} = require("@greenfrog/mc-enums")

const entity = require("../entity/EntityModule").get_module()

const PermissionManager = require("../permission/PermissionManager")

const World = require("../world/World")

const DamageCause = require("./types/DamageCause")

const { EventEmitter, Event } = require("@kotinash/better-events")

const { get_key } = require("../utils/Language")

const Logger = require("../utils/Logger")

const Frog = require("../Frog")

const PlayerInfo = require("./PlayerInfo")

const UsernameValidator = require("./UsernameValidator")

const ServerTextPacket = require("../network/packets/ServerTextPacket")
const ServerSetTimePacket = require("../network/packets/ServerSetTimePacket")
const ServerTransferPacket = require("../network/packets/ServerTransferPacket")
const ServerSetEntityMotion = require("../network/packets/ServerSetEntityMotion")
const ServerSetHealthPacket = require("../network/packets/ServerSetHealthPacket")
const ServerPlayerListPacket = require("../network/packets/ServerPlayerListPacket")
const ServerPlayStatusPacket = require("../network/packets/ServerPlayStatusPacket")
const ServerSetEntityDataPacket = require("../network/packets/ServerSetEntityDataPacket")
const ServerChangeDimensionPacket = require("../network/packets/ServerChangeDimensionPacket")
const ServerUpdateAttributesPacket = require("../network/packets/ServerUpdateAttributesPacket")
const ServerChunkRadiusUpdatePacket = require("../network/packets/ServerChunkRadiusUpdatePacket")
const ServerSetPlayerGameTypePacket = require("../network/packets/ServerSetPlayerGameTypePacket")

class Player {
	/** @type {import("@greenfrog/mc-enums").PossiblyUndefined<string>} */
	name

	/** @type {World} */
	world = new World()

	/** @type {import("@greenfrog/mc-enums").PossiblyUndefined<import("@greenfrog/mc-enums").Gamemode>} */
	gamemode

	// TODO: Types for this
	/** @type {any} */
	permissions = {}

	/** @type {import("@greenfrog/mc-enums").PossiblyUndefined<import("frog-protocol").Player>} */
	connection

	/** @type {import("@greenfrog/mc-enums").PossiblyUndefined<boolean>} */
	dead

	/** @type {number} */
	health = 20

	/** @type {boolean} */
	offline = false

	/** @type {boolean} */
	render_chunks = true

	/** @type {import("Frog").Location} */
	location = {
		on_ground: true,
		x: 0,
		y: -47,
		z: 0,
		yaw: 0,
		pitch: 0
	}

	/** @type {any} */
	profile

	/** @type {any} */
	network_data = {
		pps: 0
	}

	_internal = {
		fall_damage: {
			queue: 0,
			invulnerable: false
		}
	}

	/** @type {any} */
	entity = {
		is_following: false
	}

	/**
	 * @param {string} _name
	 * @param {import("frog-protocol").Player} _connection
	 */
	constructor(
		_name,
		_connection
	) {
		this.name = _name

		this.connection = _connection

		/** @private */
		const { config } = Frog

		Object.assign(
			this.world,
			{
				render_distance: config.world.render_distance.server_side,
				name: config.world.name,
				generator: config.world.generators.type.toLowerCase(),
				spawn_coordinates: new Vec3(0, (this.world.generator === WorldGenerationType.Flat) ? 47 : 48, 0)
			}
		)

		Object.assign(
			this.permissions,
			{
				op: null,
				permission_level: config.dev.default_permission_level
			}
		)

		PermissionManager
			.is_opped(this.name)
			.then((result) => {
				this.permissions.op = result
				this.permissions.permission_level = PermissionLevel.Operator
			})

		if (this.world.generator === WorldGenerationType.Default) {
			entity.set_spawn_y_coordinate(this.world.spawn_coordinates.y - 34)
		}

		// TODO: Flat & void

		this.gamemode = /** @type {import("@greenfrog/mc-enums").Gamemode} */ config.world.gamemode.player

		this.dead = false

		this.on("leave", (() => {
			this.offline = true

			for (const current_player of PlayerInfo.players_online) {
				if (current_player.username === this.name) {
					continue
				}

				const player_list = new ServerPlayerListPacket()
				player_list.type = PlayerListAction.Remove
				player_list.uuid = this.profile.uuid
				player_list.write_packet(current_player)
			}

			EventEmitter.emit(
				new Event(
					"playerLeave",
					{
						player: this
					}
				)
			)

			Logger.info(
				get_key(
					"status.resourcePacks.disconnected",
					[
						this.name
					]
				)
			)

			if (
				Frog.config.chat.system_messages.left
			) {
				Frog.broadcast_message(
					get_key(
						"chat.broadcasts.left",
						[
							this.name
						]
					)
				)
			}

			this.profile = this.connection.profile
			this.connection.profile = undefined
		}))
	}

	/**
	 * @param {string} message
	 * @param {boolean} hide_disconnection_screen
	 */
	kick(
		message = get_key("kickMessages.serverDisconnect"),
		hide_disconnection_screen = false
	) {
		EventEmitter.emit(
			new Event(
				"playerKick",
				{
					player: this,
					message,
				}
			),
			false
		)

		const disconnection_message = new DisconnectionMessage(message)

		Logger.info(
			get_key("player.kicked",
				[
					this.name,
					disconnection_message.message
				]
			)
		)

		this.disconnect(disconnection_message.message, hide_disconnection_screen)
	}

	/**
	 * @param {string} cause
	 */
	kill(cause = DamageCause.Unknown) {
		EventEmitter.emit(
			new Event(
				"playerKill",
				{
					player: this,
				},
				(() => {
					this.set_health(0, cause)
				})
			)
		)
	}

	/**
	 * @param {number} health
	 * @param {string} cause
	 */
	set_health(health, cause = DamageCause.Unknown) {
		if (this.dead) return

		EventEmitter.emit(
			new Event(
				"serverSetHealth",
				{
					player: this,
					health,
					cause,
				},
				(() => {
					const set_health_packet = new ServerSetHealthPacket()
					set_health_packet.health = health
					set_health_packet.write_packet(this)

					this.set_attribute({
						name: Attribute.Health,
						min: 0,
						max: 20,
						current: health,
						default: 0,
						modifiers: [],
					})

					this.health = health

					switch (cause) {
						case DamageCause.Fall:
							return EventEmitter.emit(
								new Event(
									"playerFallDamage",
									{
										player: this,
										health,
										cause,
									}
								)
							)
						case DamageCause.Regeneration:
							return EventEmitter.emit(
								new Event(
									"playerRegenerate",
									{
										player: this,
										health,
										cause,
									}
								)
							)
					}

					if (this.health <= 0) {
						EventEmitter.emit(
							new Event(
								"playerDeath",
								{
									player: this,
								}
							)
						)

						this.dead = true
					}
				})
			)
		)
	}

	/**
	 * @param {boolean} status
	 * @returns {Promise<void>}
	 */
	async set_op(status) {
		const result = await PermissionManager.set_op(
			this.name,
			status
		)

		return result
	}

	/**
	 * @param {string} play_status
	 * @param {boolean} terminate_connection
	 */
	send_play_status(
		play_status,
		terminate_connection = false
	) {
		EventEmitter.emit(
			new Event(
				"playerPlayStatus",
				{
					player: this,
					play_status,
					terminate_connection,
				},
				(() => {
					const play_status_packet = new ServerPlayStatusPacket()
					play_status_packet.status = play_status
					play_status_packet.write_packet(this)

					if (terminate_connection) {
						Logger.info(
							get_key(
								"kickMessages.play_status.console",
								[
									this.name
								]
							)
						)

						setTimeout(() => {
							this.kick(
								get_key(
									"kickMessages.play_status",
									[
										play_status
									]
								)
							)
						}, 5000)
					}
				})
			)
		)
	}

	/**
	 * @param {number} speed
	 */
	set_speed(speed) {
		EventEmitter.emit(
			new Event(
				"serverSpeedUpdate",
				{
					player: this,
					speed
				},
				(() => {
					this.set_attribute({
						min: 0,
						max: 3.4,
						current: speed,
						default: speed,
						name: Attribute.Speed,
						modifiers: [],
					})
				})
			)
		)
	}

	/**
	 * @param {number} time
	 */
	set_time(time) {
		EventEmitter.emit(
			new Event(
				"serverTimeUpdate",
				{
					player: this,
					time
				},
				(() => {
					const set_time_packet = new ServerSetTimePacket()
					set_time_packet.time = time
					set_time_packet.write_packet(this)
				})
			)
		)
	}

	/**
	 * @param {import("Frog").Attribute} attribute
	 */
	set_attribute(attribute) {
		EventEmitter.emit(
			new Event(
				"playerSetAttribute",
				{
					player: this,
					attribute,
				},
				(() => {
					const update_attributes_packet = new ServerUpdateAttributesPacket()
					update_attributes_packet.runtime_entity_id = 1 // local player
					update_attributes_packet.tick = 0
					update_attributes_packet.attributes = [attribute]
					update_attributes_packet.write_packet(this)
				})
			)
		)
	}

	/**
	 * @param {import("Frog").EntityData} data
	 */
	set_entity_data = function (data) {
		EventEmitter.emit(
			new Event(
				"serverSetEntityData",
				{
					player: this,
					data,
				}
			),
			(() => {
				const player_set_entity_data_packet = new ServerSetEntityDataPacket()
				player_set_entity_data_packet.properties = {
					ints: [],
					floats: [],
				}
				player_set_entity_data_packet.runtime_entity_id = "1" // Local player
				player_set_entity_data_packet.tick = "0"
				player_set_entity_data_packet.value = data
				player_set_entity_data_packet.write_packet(this)
			})
		)
	}

	/**
	 * @param {number} radius
	 */
	set_chunk_radius = function (radius) {
		EventEmitter.emit(
			new Event(
				"serverUpdateChunkRadius",
				{
					player: this,
					radius
				},
				(() => {
					const chunk_radius_update = new ServerChunkRadiusUpdatePacket()
					chunk_radius_update.chunk_radius = radius
					chunk_radius_update.write_packet(this)
				})
			)
		)
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {import("Frog").DimensionId} dimension
	 * @param {boolean} [respawn]
	 */
	set_dimension = function (x, y, z, dimension, respawn = false) {
		EventEmitter.emit(
			new Event(
				"serverSetDimension",
				{
					player: this,
					dimension,
					coordinates: { x, y, z },
					respawn
				},
				(() => {
					const dimension_packet = new ServerChangeDimensionPacket()
					dimension_packet.position = {x, y, z}
					dimension_packet.dimension = dimension
					dimension_packet.respawn = respawn
					dimension_packet.write_packet(this)
				})
			)
		)
	}

	/**
	 * Transfers the player to a different server
	 *
	 * @param {string} address
	 * @param {number} port
	 */
	transfer(address, port) {
		EventEmitter.emit(
			new Event(
				"playerTransfer",
				{
					player: this,
					port,
					address,
				},
				(() => {
					const transfer_packet = new ServerTransferPacket()
					transfer_packet.server_address = address
					transfer_packet.port = port
					transfer_packet.write_packet(this)
				})
			)
		)
	}

	/**
	 * @param {string} message
	 */
	send_message(message) {
		EventEmitter.emit(
			new Event(
				"serverMessage",
				{
					player: this,
					message
				},
				(() => {
					const text_packet = new ServerTextPacket()
					text_packet.message = message
					text_packet.needs_translation = false
					text_packet.type = Text.Announcement
					text_packet.platform_chat_id = ""
					text_packet.source_name = ""
					text_packet.xuid = ""
					text_packet.write_packet(this)
				})
			)
		)
	}

	/**
	 * @param {import("@greenfrog/mc-enums").Gamemode} gamemode
	 */
	set_gamemode(gamemode) {
		EventEmitter.emit(
			new Event(
				"serverGamemodeChange",
				{
					player: this,
					gamemode
				},
				(() => {
					this.gamemode = gamemode

					const set_player_gamemode = new ServerSetPlayerGameTypePacket()
					set_player_gamemode.gamemode = gamemode
					set_player_gamemode.write_packet(this)
				})
			)
		)
	}

	/**
	 * NOTE: This is handled client-side
	 *
	 * @param {Vec3} coordinates
	 */
	set_velocity(coordinates = new Vec3(0, 0, 0)) {
		EventEmitter.emit(
			new Event(
				"serverVelocityUpdate",
				{
					player: this,
					coordinates
				},
				(() => {
					const set_entity_motion_packet = new ServerSetEntityMotion()
					set_entity_motion_packet.runtime_entity_id = 1
					set_entity_motion_packet.velocity = coordinates
					set_entity_motion_packet.write_packet(this)
				})
			)
		)
	}

	/**
	 * @param {string} message
	 */
	chat(message) {
		EventEmitter.emit(
			new Event(
				"serverChat",
				{
					player: this,
					message
				},
				(() => {
					Frog.broadcast_message(
						get_key(
							"chat.format",
							[
								this.name,
								message
							]
						)
					)
				})
			)
		)
	}

	/**
	 * @returns {boolean}
	 */
	is_username_valid() {
		return UsernameValidator.is_username_valid(this.name) && Frog.config.dev.validate_usernames
	}

	queue(...args) {
		this.connection.queue(...args)
	}

	write(...args) {
		this.connection.write(...args)
	}

	disconnect(...args) {
		this.connection.disconnect(...args)
	}

	on(...args) {
		this.connection.on(...args)
	}

	once(...args) {
		this.connection.once(...args)
	}
}

module.exports = Player
