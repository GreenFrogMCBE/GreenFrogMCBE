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
   * It returns the string "set_commands_enabled"
   * @returns The name of the packet.
   */
  name() {
    return "set_commands_enabled";
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
   * It writes a packet to the client
   */
  send(client) {
    client.write(this.name(), {
      enabled: this.getEnabled(),
    });
  }
}

module.exports = SetCommandsEnabled;
