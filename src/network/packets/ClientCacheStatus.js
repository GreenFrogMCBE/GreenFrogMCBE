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
let enabled = false;
class ClientCacheStatus extends require("./Packet") {
  /**
   * It returns the packet name
   * @returns Packet name
   */
  name() {
    return "client_cache_status";
  }

  /**
   * SetEnabled(enabled1) {
   *     enabled = enabled1;
   * }
   * @param {Boolean} enabled1 - Is enabled or not.
   */
  setEnabled(enabled1) {
    enabled = enabled1;
  }

  /**
   * GetEnabled() {
   *     return enabled;
   * }
   * @returns The command enabled.
   */
  getEnabled() {
    return enabled;
  }

  /**
   * It send the packet to the client
   * @param {Object} client
   */
  send(client) {
    client.write(this.name(), {
      enabled: this.getEnabled(client),
    });
  }
}

module.exports = ClientCacheStatus;
