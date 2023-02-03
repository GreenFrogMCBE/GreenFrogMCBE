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
/* It sends a packet to the client to update a block */
class UpdateBlock extends require("./Packet") {
  /**
   * It returns the string "update_block"
   * @returns The name of the packet.
   */
  name() {
    return "update_block";
  }

  /**
   * It sends a packet to the client to update a block
   * @param client - The client that you want to send the packet to.
   * @param x - The x coordinate of the block
   * @param y - The y coordinate of the block
   * @param z - The z coordinate of the block
   * @param block_runtime_id - The block ID of the block you want to place.
   */
  send(client, x, y, z, block_runtime_id) {
    client.write("update_block", {
      position: {
        x: x,
        y: y,
        z: z,
      },
      block_runtime_id: block_runtime_id,
      flags: {
        _value: 2,
        neighbors: false,
        network: true,
        no_graphic: false,
        unused: false,
        priority: false,
      },
      layer: 0,
    });
  }
}

module.exports = UpdateBlock;
