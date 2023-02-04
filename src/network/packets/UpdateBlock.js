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

let x = 0;
let y = 0;
let z = 0;
let block_runtime_id = 0;
let flagsvalue = 2;
let neighbors = false;
let network = true;
let no_graphic = false;
let unused = false;
let priority = false;
let layer = 0;

class UpdateBlock extends require("./Packet") {
  /**
   * It returns the string "update_block"
   * @returns The name of the packet.
   */
  name() {
    return "update_block";
  }

  /**
   * @param {Number} x1 - The x coordinate of the point.
   */
  setX(x1) {
    x = parseInt(x1);
  }

  /**
   * @param {Number} y1 - The y coordinate of the point.
   */
  setY(y1) {
    y = parseInt(y1);
  }

  /**
   * @param {Number} z1 - The z coordinate of the point.
   */
  setZ(z1) {
    z = parseInt(z1);
  }

  /**
   * @param {Number} block_runtime_id1 block_runtime_id1
   */
  setBlockRuntimeId(block_runtime_id1) {
    block_runtime_id = parseInt(block_runtime_id1);
  }

  /**
   * @param {Number} flagsvalue1 flagsvalue1
   */
  setFlagsValue(flagsvalue1) {
    flagsvalue = parseInt(flagsvalue1);
  }

  /**
   * @param {Number} neighbors1 neighbors1
   */
  setNeighbors(neighbors1) {
    neighbors = neighbors1;
  }

  /**
   * @param {Number} network1 network1
   */
  setNetwork(network1) {
    network = network1;
  }

  /**
   * @param {Number} no_graphic1 no_graphic1
   */
  setNoGraphic(no_graphic1) {
    no_graphic = no_graphic1;
  }

  /**
   * @param {Number} unused1 unused1
   */
  setUnused(unused1) {
    unused = unused1;
  }

  /**
   * @param {Number} priority1 priority1
   */
  setPriority(priority1) {
    priority = priority1;
  }

  /**
   * @param {Number} layer1 layer1
   */
  setLayer(layer1) {
    layer = parseInt(layer1);
  }

  /**
   * @param {Number} x x
   */
  getX() {
    return x;
  }

  /**
   * @param {Number} y y
   */
  getY() {
    return y;
  }

  /**
   * @param {Number} z z
   */
  getZ() {
    return z;
  }

  /**
   * @param {Number} block_runtime_id block_runtime_id
   */
  getBlockRuntimeId() {
    return block_runtime_id;
  }

  /**
   * @param {Number} flagsvalue flagsvalue
   */
  getFlagsValue() {
    return flagsvalue;
  }

  /**
   * @param {Number} neighbors neighbors
   */
  getNeighbors() {
    return neighbors;
  }

  /**
   * @param {Number} network network
   */
  getNetwork() {
    return network;
  }

  /**
   * @param {Number} no_graphic no_graphic
   */
  getNoGraphic() {
    return no_graphic;
  }

  /**
   * @param {Number} unused unused
   */
  getUnused() {
    return unused;
  }

  /**
   * @param {Number} priority priority
   */
  getPriority() {
    return priority;
  }

  /**
   * @param {Number} layer layer
   */
  getLayer() {
    return layer;
  }

  /**
   * It sends a packet to the client to update a block
   * @param {Object} client - The client that you want to send the packet to.
   * @param {Number} x - The x coordinate of the block
   * @param {Number} y - The y coordinate of the block
   * @param {Number} z - The z coordinate of the block
   * @param {Number} block_runtime_id - The block ID of the block you want to place.
   */
  send(client, x, y, z, block_runtime_id) {
    client.write("update_block", {
      position: {
        x: this.getX(),
        y: this.getY(),
        z: this.getZ(),
      },
      block_runtime_id: this.getBlockRuntimeId(),
      flags: {
        _value: this.getFlagsValue(),
        neighbors: this.getNeighbors(),
        network: this.getNetwork(),
        no_graphic: this.getNoGraphic(),
        unused: this.getUnused(),
        priority: this.getPriority(),
      },
      layer: this.getLayer(),
    });
  }
}

module.exports = UpdateBlock;
