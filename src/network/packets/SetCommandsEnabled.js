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
class SetCommandsEnabled extends require("./Packet") {
  /**
   * It returns the string "set_commands_enabled"
   * @returns The name of the packet.
   */
  name() {
    return "set_commands_enabled";
  }

  /**
   * If the client is null, throw an error.
   * @param client - The client that sent the packet.
   */
  validate(client) {
    if (!client) throw new Error("Packet processing error. Client is null");
  }

  /**
   * It writes a packet to the client
   * @param client - The client that is being written to.
   * @param [enabled=true] - Whether or not the client should be able to use the command.
   */
  writePacket(client, enabled = true) {
    this.validate(client);
    client.write(this.name(), {
      enabled: enabled,
    });
  }
}

module.exports = SetCommandsEnabled;
