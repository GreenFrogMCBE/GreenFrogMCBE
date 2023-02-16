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
const Dimensions = require("./types/DimensionsLegacy");

let dim = Dimensions.OVERWORLD;
let pos = {
  x: 0,
  y: 0,
  z: 0,
};
let respawn = false;

class ChangeDimension extends require("./Packet") {
  /**
   * @returns The name of the packet.
   */
  name() {
    return "change_dimension";
  }

  /**
   * Sets the dimension
   * @param {Dimensions} dim1
   */
  setDimension(dim1) {
    dim = dim1;
  }

  /**
   * Sets the position
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  setPosition(x, y, z) {
    pos.x = x;
    pos.y = y;
    pos.z = z;
  }

  /**
   * Sets if the player needs to be respawned after the dimension change (default = false)
   * @param {boolean} respawn1
   */
  setRespawn(respawn1) {
    respawn = respawn1;
  }

  /**
   * Returns the dimension
   * @returns The dimension
   */
  getDimension() {
    return dim;
  }

  /**
   * Returns if the player needs the be respawned
   * @returns If the player needs the be respawned
   */
  getRespawn() {
    return respawn;
  }

  /**
   * Returns the position of the player
   * @returns The position of the player
   */
  getPosition() {
    return pos;
  }

  send(client) {
    client.write(this.name(), {
      dimension: this.getDimension(),
      position: this.getPosition(),
      respawn: this.getRespawn(),
    });
  }
}

module.exports = ChangeDimension;
