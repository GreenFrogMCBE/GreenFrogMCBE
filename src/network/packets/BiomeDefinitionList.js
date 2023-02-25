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
let value = {};

class BiomeDefinitionList extends require("./Packet") {
  /**
   * @returns The name of the packet.
   */
  name() {
    return "biome_definition_list";
  }

  /**
   * It sets the packet value
   * @param pkvalue - The packet value data to set.
   */
  setValue(pkvalue) {
    value = pkvalue;
  }

  /**
   * It returns the packet value
   * @returns The packet value.
   */
  getValue() {
    return value;
  }

  /**
   * It send the packet to the client
   * @param {Object} client
   */
  send(client) {
    client.write(this.name(), this.getValue());
  }
}

module.exports = BiomeDefinitionList;
