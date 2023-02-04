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
let must_accept = false;
let behavior_packs = [];
let resource_packs = [];
let game_version = "";
let experiments = [];
let experiments_previously_used = false;

class ResourcePackStack extends require("./Packet") {
  /**
   * It returns the packet name
   * @returns The packet name
   */
  name() {
    return "resource_pack_stack";
  }

  /**
   * Sets the most_accept
   * @param {Boolean} must_accept1
   */
  setMustAccept(must_accept1) {
    must_accept = must_accept1;
  }

  /**
   * Sets the behavior_packs
   * @returns {Boolean}
   */
  setBehaviorPacks(behavior_packs1) {
    behavior_packs = behavior_packs1;
  }

  /**
   * Sets the resource_packs
   * @returns {Boolean}
   */
  setResourcePacks(resource_packs1) {
    resource_packs = resource_packs1;
  }

  /**
   * Sets the game_version
   */
  setGameVersion(game_version1) {
    game_version = game_version1;
  }

  /**
   * Sets the experiments
   */
  setExperiments(experiments1) {
    experiments = experiments1;
  }

  /**
   * Sets the experiments_previously_used
   * @param {Boolean} experiments_previously_used1
   */
  setExperimentsPreviouslyUsed(experiments_previously_used1) {
    experiments_previously_used = experiments_previously_used1;
  }

  /**
   * Returns the must_accept
   * @returns The must_accept
   */
  getMustAccept() {
    return must_accept;
  }

  /**
   * Returns the behavior_packs
   * @returns The behavior_packs
   */
  getBehaviorPacks() {
    return behavior_packs;
  }

  /**
   * Returns the resource_packs
   * @returns The resource_packs
   */
  getResourcePacks() {
    return resource_packs;
  }

  /**
   * Returns the game_version
   * @returns The game_version
   */
  getGameVersion() {
    return game_version;
  }

  /**
   * Returns the experiments
   * @returns The experiments
   */
  getExperiments() {
    return experiments;
  }

  /**
   * Returns the experiments_previously_used
   * @returns The experiments_previously_used
   */
  getExperimentsPreviouslyUsed() {
    return experiments_previously_used;
  }

  send(client) {
    client.write(this.name(), {
      must_accept: must_accept,
      behavior_packs: behavior_packs,
      resource_packs: resource_packs,
      game_version: game_version,
      experiments: experiments,
      experiments_previously_used: experiments_previously_used,
    });
  }
}

module.exports = ResourcePackStack;
