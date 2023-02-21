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
  name() {
    return "update_block";
  }

  /**
   * Sets the X coordinate
   * @param {Number} x1 - The X coordinate
   */
  setX(x1) {
    x = parseInt(x1);
  }

  /**
   * Sets the Y coordinate
   * @param {Number} y1 - The Y coordinate
   */
  setY(y1) {
    y = parseInt(y1);
  }

  /**
   * Sets the Z coordinate
   * @param {Number} z1 - The Z coordinate
   */
  setZ(z1) {
    z = parseInt(z1);
  }

  /**
   * Sets the block runtime id
   * @param {Number} block_runtime_id1 - Sets the block runtime id.
   */
  setBlockRuntimeId(block_runtime_id1) {
    block_runtime_id = parseInt(block_runtime_id1);
  }

  /**
   * Sets the flags value
   * @param {Number} flagsvalue1 - Flags value (count).
   */
  setFlagsValue(flagsvalue1) {
    flagsvalue = parseInt(flagsvalue1);
  }

  /**
   * Sets the "neighbors" flag
   * @param {Number} neighbors1
   */
  setNeighbors(neighbors1) {
    neighbors = neighbors1;
  }

  /**
   * Sets the network flag
   * @param {Number} network1
   */
  setNetwork(network1) {
    network = network1;
  }

  /**
   * Sets the no_graphic flag
   * @param {Number} no_graphic1
   */
  setNoGraphic(no_graphic1) {
    no_graphic = no_graphic1;
  }

  /**
   * Sets the unused flag
   * @param {Number} unused1
   */
  setUnused(unused1) {
    unused = unused1;
  }

  /**
   * Sets the priority flag
   * @param {Boolean} priority1
   */
  setPriority(priority1) {
    priority = priority1;
  }

  /**
   * Sets the layer
   * @param {Number} layer1 - The layer.
   */
  setLayer(layer1) {
    layer = parseInt(layer1);
  }

  /**
   * Returns the X coordinate
   * @param {Number} x - The X coordinate.
   */
  getX() {
    return x;
  }

  /**
   * Returns the Y coordinate
   * @param {Number} y - The Y coordinate.
   */
  getY() {
    return y;
  }

  /**
   * Returns the Z coordinate
   * @param {Number} z - The Z coordinate.
   */
  getZ() {
    return z;
  }

  /**
   * Returns the block runtime id
   * @param {Number} block_runtime_id
   */
  getBlockRuntimeId() {
    return block_runtime_id;
  }

  /**
   * Returns the flags value
   * @param {Number} flagsvalue
   */
  getFlagsValue() {
    return flagsvalue;
  }

  /**
   * Returns the flags value called "neighbors"
   * @param {Number} neighbors
   */
  getNeighbors() {
    return neighbors;
  }

  /**
   * Returns the flags value called "network"
   * @param {Number} network
   */
  getNetwork() {
    return network;
  }

  /**
   * Returns the flags value called "no_graphic"
   * @param {Number} no_graphic
   */
  getNoGraphic() {
    return no_graphic;
  }

  /**
   * Returns the flags value called "unused"
   * @param {Number} unused
   */
  getUnused() {
    return unused;
  }

  /**
   * Returns the flags value called "priority"
   * @param {Number} priority
   */
  getPriority() {
    return priority;
  }

  /**
   * Returns the layer
   * @param {Number} layer
   */
  getLayer() {
    return layer;
  }

  /**
   * Sends the packet
   * @param {Object} client - The client that you want to send the packet to.
   * @param {Number} x - The x coordinate of the block
   * @param {Number} y - The y coordinate of the block
   * @param {Number} z - The z coordinate of the block
   * @param {Number} block_runtime_id - The block ID of the block you want to place.
   */
  send(client) {
    client.write(this.name(), {
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
