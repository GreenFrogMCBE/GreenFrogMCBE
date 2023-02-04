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
let nbt = null;
class AvailableEntityIdentifiers extends require("./Packet") {
  /**
   * It returns the packet name
   * @returns Packet name
   */
  name() {
    return "available_entity_identifiers";
  }

  /**
   * It sets the NBT
   * @param nbt1 - The NBT data to set.
   */
  setNBT(nbt1) {
    nbt = nbt1;
  }

  /**
   * `getNbt()` returns the NBT
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
      nbt: nbt,
    });
  }
}

module.exports = AvailableEntityIdentifiers;
