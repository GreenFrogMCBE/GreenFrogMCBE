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
   * @returns The name of the packet.
   */
  name() {
    return "client_cache_status";
  }

  /**
   * It returns if the client cache is enabled or not
   * @param {Boolean} enabled1 - Is caching enabled or not.
   */
  setEnabled(enabled1) {
    enabled = enabled1;
  }

  /**
   * It returns if the caching are enabled or not
   * @returns If the caching are enabled.
   */
  getEnabled() {
    return enabled;
  }

  send(client) {
    client.queue(this.name(), {
      enabled: this.getEnabled(client),
    });
  }
}

module.exports = ClientCacheStatus;
