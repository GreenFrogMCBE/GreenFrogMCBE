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
let chunk_radius = 0

class ChunkRadiusUpdate extends require("./Packet") {
  /**
   * It returns the packet name
   * @returns Packet name
  */
  name() {
    return "chunk_radius_update";
  }

  /**
   * It returns the chunk radius
   * @param {Number} radius 
   */
  setChunkRadius(radius) {
    chunk_radius = radius;
  }

  /**
   * It returns the chunk radius
   * @returns The chunk radius
   */
  getChunkRadius() {
    return chunk_radius;
  }

  /**
   * It send the packet to the client
   * @param {Object} client 
   */
  send(client) {
    client.write(this.name(), {
      chunk_radius: this.getChunkRadius(),
    });
  }
}

module.exports = ChunkRadiusUpdate;
