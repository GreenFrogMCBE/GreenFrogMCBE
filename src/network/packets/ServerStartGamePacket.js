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
const Packet = require("./Packet");

const ChatRestrictionLevel = require("./types/ChatRestrictionLevel");

class ServerStartGamePacket extends Packet {
	name = "start_game";

	/** @type {number | undefined} */
	entity_id;
	/** @type {number | undefined} */
	runtime_entity_id;
	/** @type {string | undefined} */
	player_gamemode;
	/** @type {import("Frog").Coordinate | undefined} */
	player_position;
	/** @type {import("Frog").Rotation | undefined} */
	rotation;
	/** @type {import("Frog").WorldSeed | undefined} */
	seed;
	/** @type {number | undefined} */
	biome_type;
	/** @type {string | undefined} */
	biome_name;
	/** @type {import("Frog").Dimension | undefined} */
	dimension;
	/** @type {import("Frog").Generator | undefined} */
	generator;
	/** @type {import("Frog").Gamemode | undefined} */
	world_gamemode;
	/** @type {import("Frog").Difficulty | undefined} */
	difficulty;
	/** @type {import("Frog").Coordinate | undefined} */
	spawn_position;
	/** @type {any[] | undefined} */
	gamerules;
	/** @type {any[] | undefined} */
	itemstates;
	/** @type {string | undefined} */
	world_name;
	/** @type {string | undefined} */
	game_version;
	/** @type {import("Frog").MovementAuthority | undefined} */
	movement_authority;
	/** @type {import("Frog").PermissionLevel | undefined} */
	permission_level;

	/**
	 * @param {import("Frog").Player} player
	 */
	writePacket(player) {
		player.queue(this.name, {
			entity_id: this.entity_id,
			runtime_entity_id: this.runtime_entity_id,
			player_gamemode: this.player_gamemode,
			player_position: this.player_position,
			rotation: this.rotation,
			seed: this.seed,
			biome_type: this.biome_type,
			biome_name: this.biome_name,
			dimension: this.dimension,
			generator: this.generator,
			world_gamemode: this.world_gamemode,
			difficulty: this.difficulty,
			spawn_position: this.spawn_position,
			achievements_disabled: true,
			editor_world: false,
			created_in_editor: false,
			exported_from_editor: false,
			day_cycle_stop_time: 18,
			edu_offer: 0,
			edu_features_enabled: false,
			edu_product_uuid: "",
			rain_level: 0,
			lightning_level: 0,
			has_confirmed_platform_locked_content: false,
			is_multiplayer: true,
			broadcast_to_lan: true,
			xbox_live_broadcast_mode: 6,
			platform_broadcast_mode: 6,
			enable_commands: true,
			is_texturepacks_required: false,
			gamerules: this.gamerules,
			experiments: [],
			experiments_previously_used: false,
			bonus_chest: false,
			map_enabled: false,
			permission_level: this.permission_level,
			server_chunk_tick_range: 4,
			has_locked_behavior_pack: false,
			has_locked_resource_pack: false,
			is_from_locked_world_template: false,
			msa_gamertags_only: true,
			is_from_world_template: false,
			is_world_template_option_locked: false,
			only_spawn_v1_villagers: false,
			persona_disabled: false,
			custom_skins_disabled: false,
			emote_chat_muted: false,
			game_version: "*",
			limited_world_width: 16,
			limited_world_length: 16,
			is_new_nether: false,
			edu_resource_uri: {
				button_name: "",
				link_uri: "",
			},
			experimental_gameplay_override: false,
			chat_restriction_level: ChatRestrictionLevel.NONE,
			disable_player_interactions: false,
			level_id: this.world_name,
			world_name: this.world_name,
			premium_world_template_id: "00000000-0000-0000-0000-000000000000",
			is_trial: false,
			movement_authority: this.movement_authority,
			rewind_history_size: 20,
			server_authoritative_block_breaking: false,
			current_tick: [0, 0],
			enchantment_seed: 0,
			block_properties: [],
			itemstates: this.itemstates,
			multiplayer_correlation_id: "00000000-0000-0000-0000-000000000000",
			server_authoritative_inventory: true,
			engine: "GreenFrog",
			property_data: {
				type: "compound",
				name: "",
				value: {},
			},
			block_pallette_checksum: [0, 0],
			world_template_id: "00000000-0000-0000-0000-000000000000",
			client_side_generation: false,
			block_network_ids_are_hashes: true,
			server_controlled_sound: false,
		});
	}
}

module.exports = ServerStartGamePacket;
