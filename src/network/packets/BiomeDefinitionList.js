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
let nbt = {};

class BiomeDefinitionList extends require("./Packet") {
  /**
   * @returns The name of the packet.
   */
  name() {
    return "biome_definition_list";
  }

  /**
   * It sets the NBT
   * @param nbt1 - The NBT data to set.
   */
  setNBT(nbt1) {
    nbt = nbt1;
  }

  /**
   * It returns the NBT data
   * @returns The NBT.
   */
  getNbt() {
    return nbt;
  }

  /**
   * It send the packet to the client
   * @param {Object} client
   */
  send(client) {
    client.write(this.name(), {
      nbt: this.getNbt(),
    });
  }
}

module.exports = BiomeDefinitionList;
