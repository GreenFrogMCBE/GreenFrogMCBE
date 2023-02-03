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
class ResponsePackInfo extends require("./Packet") {
  /**
   * It returns the name of the packet.
   * @returns The name of the packet.
   */
  name() {
    return "resource_packs_info";
  }

  /**
   * It sends a packet to the client.
   * @param client - The client that is being sent the packet.
   * @param [must_accept=false] - Whether the client must accept the EULA to join the server.
   * @param [has_scripts=false] - Whether or not the client has scripts enabled.
   * @param [behavior_packs] - An array of behavior packs that the client has installed.
   * @param [texture_packs] - An array of texture pack names.
   */
  writePacket(
    client,
    must_accept = false,
    has_scripts = false,
    behavior_packs = [],
    texture_packs = []
  ) {
    this.validate(client);
    client.write(this.name(), {
      must_accept: must_accept,
      has_scripts: has_scripts,
      behaviour_packs: behavior_packs,
      texture_packs: texture_packs,
    });
  }
}

module.exports = ResponsePackInfo;
