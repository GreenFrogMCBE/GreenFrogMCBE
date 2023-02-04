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
let has_scripts = false;
let behavior_packs = [];
let texture_packs = [];

class ResponsePackInfo extends require("./Packet") {
  /**
   * It returns the name of the packet.
   * @returns The name of the packet.
   */
  name() {
    return "resource_packs_info";
  }

  /**
   * This function updates the value of the must_accept
   * @param must_accept1 - true or false
   */
  setMustAccept(must_accept1) {
    must_accept = must_accept1;
  }

  /**
   * It updates the has_scripts value
   * @param has_scripts1 - true or false
   */
  setHasScripts(has_scripts1) {
    has_scripts = has_scripts1;
  }

  /**
   * It updates the behavior_packs
   * @param behavior_packs1 - The behavior packs that you want to set.
   */
  setBehaviorPacks(behavior_packs1) {
    behavior_packs = behavior_packs1;
  }

  /**
   * It sets the texture_packs
   * @param texture_packs1 - The texture packs to set.
   */
  setTexturePacks(texture_packs1) {
    texture_packs = texture_packs1;
  }

  /**
   * It returns the value must_accept.
   * @returns The value must_accept.
   */
  getMustAccept() {
    return must_accept;
  }

  /**
   * This function returns the value has_scripts.
   * @returns The value has_scripts.
   */
  getHasScripts() {
    return has_scripts;
  }

  /**
   * It returns the behavior_packs variable.
   * @returns The behavior_packs array.
   */
  getBehaviorPacks() {
    return behavior_packs;
  }

  /**
   * It returns the texture_packs.
   * @returns The texture_packs array.
   */
  getTexturePacks() {
    return texture_packs;
  }

  /**
   * It sends a packet to the client.
   * @param client - The client.
   */
  send(client) {
    client.write(this.name(), {
      must_accept: this.getMustAccept(),
      has_scripts: this.getHasScripts(),
      behaviour_packs: this.getBehaviorPacks(),
      texture_packs: this.getTexturePacks(),
    });
  }
}

module.exports = ResponsePackInfo;
