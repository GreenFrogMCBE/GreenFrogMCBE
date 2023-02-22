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
  name() {
    return "set_commands_enabled";
  }

  /**
   * Returns if commands are enabled or not.
   * @param {Boolean} enabled1 - Are commands enabled or not
   */
  setEnabled(enabled1) {
    enabled = enabled1;
  }

  /**
   * Returns if commands are enabled or not
   * @returns If the commands are enabled
   */
  getEnabled() {
    return enabled;
  }

  /**
   * Sends the packet
   * @param {Object} client
   */
  send(client) {
    client.write(this.name(), {
      enabled: this.getEnabled(),
    });
  }
}

module.exports = SetCommandsEnabled;
