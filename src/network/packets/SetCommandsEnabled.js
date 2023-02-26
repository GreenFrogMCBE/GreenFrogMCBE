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

let enabled = true;

class SetCommandsEnabled extends require("./Packet") {
  /**
   * @returns The name of the packet.
   */
  name() {
    return "set_commands_enabled";
  }

  /**
   * It returns if commands are enabled or not.
   * @param {Boolean} enabled1 - Are commands enabled.
   */
  setEnabled(enabled1) {
    enabled = enabled1;
  }

  /**
   * It returns if commands are enabled or not.
   * @returns If the commands are enabled.
   */
  getEnabled() {
    return enabled;
  }

  /**
   * @param {Object} client
   */
  send(client) {
    client.queue(this.name(), {
      enabled: this.getEnabled(),
    });
  }
}

module.exports = SetCommandsEnabled;
