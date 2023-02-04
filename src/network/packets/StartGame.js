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
const Gamemode = require("../../player/GameMode");

let entity_id = 0;
let runtimeentity_id = 0
let gamemode = Gamemode.FALLBACK
let playerx = 0
let playery = 0
let playerz = 0
let rotationx = 0
let rotationz = 0
let seed = []
let biome_type = 0
let biome_name = ""
let dimension = "overworld"
let generator = 2
let world_gamemode = 0
let difficulty = 0
let spawn = {
  x: 0,
  y: 0,
  z: 0
}
let gamerules = []
let itemstates = []
let permission_level = 0

class StartGame extends require("./Packet") {
  /**
   * It returns the string "start_game"
   * @returns The name of the packet.
   */
  name() {
    return "start_game";
  }

  // TODO: Docs

  setEntityId(entity_id1) {
    entity_id = entity_id1;
  }

  setRunTimeEntityId(runtimeentity_id1) {
    runtimeentity_id = runtimeentity_id1
  }

  setGamemode(gamemode1) {
    gamemode = gamemode1;
  }

  setPlayerPosition(x, y, z) {
    playerx = x;
    playery = y;
    playerz = z;
  }

  setPlayerRotation(x, z) {
    rotationx = x;
    rotationz = z;
  }

  setSeed(seed1) {
    seed = seed1;
  }

  setBiomeType(biome_type1) {
    biome_type = biome_type1
  }

  setBiomeName(biome_name1) {
    biome_name = biome_name1;
  }

  setDimension(dimension1) {
    dimension = dimension1;
  }

  setGenerator(generator1) {
    generator = generator1;
  }

  setWorldGamemode(world_gamemode1) {
    world_gamemode = world_gamemode1;
  }

  setDifficulty(difficulty1) {
    difficulty = difficulty1;
  }

  setSpawnPosition(x, y, z) {
    spawn.x = x
    spawn.y = y
    spawn.z = z
  }

  setAchievementsDisabled(disabled1) {
    achievements_disabled = disabled1
  }

  setGamemodes(gamerules1) {
    gamerules = gamerules1;
  }

  setItemStates(itemstates1) {
    itemstates = itemstates1;
  }

  setPlayerPermissionLevel(permission_level1) {
    permission_level = permission_level1;
  }

  getPlayerPermissionLevel() {
    return permission_level;
  }

  getEntityId() {
    return entity_id;
  }

  getRunTimeEntityId() {
    return runtimeentity_id;
  }

  getGamemode() {
    return gamemode;
  }

  getPlayerPosition() {
    return {
      x: playerx,
      y: playery,
      z: playerz,
    };
  }

  getPlayerRotation() {
    return {
      x: rotationx,
      z: rotationz,
    };
  }

  getSeed() {
    return seed;
  }

  getBiomeType() {
    return biome_type;
  }

  getBiomeName() {
    return biome_name;
  }

  getDimension() {
    return dimension;
  }

  getGenerator() {
    return generator;
  }

  getWorldGamemode() {
    return world_gamemode;
  }

  getDifficulty() {
    return difficulty;
  }

  getSpawnPosition() {
    return spawn;
  }

  getGamerules() {
    return gamerules
  }

  getItemStates() {
    return itemstates
  }

  /**
   * It writes a packet to the client
   * @param client - The client that will receive the packet
   */
  send(
    client
  ) {
    client.write(this.name(), {
      entity_id: this.getEntityId(),
      runtime_entity_id: this.getRunTimeEntityId(),
      player_gamemode: this.getGamemode(),
      player_position: this.getPlayerPosition(),
      rotation: this.getPlayerRotation(),
      seed: this.getSeed(),
      biome_type: this.getBiomeType(),
      biome_name: this.getBiomeName(),
      dimension: this.getDimension(),
      generator: this.getGamemode(),
      world_gamemode: this.getWorldGamemode(),
      difficulty: this.getDifficulty(),
      spawn_position: this.getSpawnPosition(),
      achievements_disabled: true,
      day_cycle_stop_time: 17,
      edu_offer: 0,
      edu_features_enabled: true,
      edu_product_uuid: "",
      rain_level: 0,
      lightning_level: 0,
      has_confirmed_platform_locked_content: false,
      is_multiplayer: true,
      broadcast_to_lan: true,
      xbox_live_broadcast_mode: 0,
      platform_broadcast_mode: 0,
      enable_commands: true,
      is_texturepacks_required: false,
      gamerules: this.getGamerules(),
      experiments: [],
      experiments_previously_used: false,
      bonus_chest: false,
      map_enabled: false,
      permission_level: this.getPlayerPermissionLevel(),
      server_chunk_tick_range: 4,
      has_locked_behavior_pack: false,
      has_locked_resource_pack: false,
      is_from_locked_world_template: false,
      msa_gamertags_only: true,
      is_from_world_template: false,
      is_world_template_option_locked: false,
      only_spawn_v1_villagers: false,
      game_version: "*",
      limited_world_width: 16,
      limited_world_length: 16,
      is_new_nether: false,
      edu_resource_uri: {
        button_name: "",
        link_uri: "",
      },
      experimental_gameplay_override: false,
      level_id: "GreenFrog",
      world_name: "GreenFrog",
      premium_world_template_id: "00000000-0000-0000-0000-000000000000",
      is_trial: false,
      movement_authority: "client",
      rewind_history_size: 20,
      server_authoritative_block_breaking: false,
      current_tick: [0, 17],
      enchantment_seed: 1181593310,
      block_properties: [],
      itemstates: this.getItemStates(),
      multiplayer_correlation_id: "77804352-c5eb-4a76-82ae-6a61fef7f618",
      server_authoritative_inventory: true,
      engine: "GreenFrogMCBE",
      property_data: {
        type: "compound",
        name: "",
        value: {},
      },
      block_pallette_checksum: [0, 0],
      world_template_id: "00000000-0000-0000-0000-000000000000",
    });
  }
}

module.exports = StartGame;
