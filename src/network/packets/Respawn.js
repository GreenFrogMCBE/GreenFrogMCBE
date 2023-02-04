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
let pos = {
  x: 0,
  y: 0,
  z: 0,
};
let state = 0;
let runtime_entity_id = 0;

class Respawn extends require("./Packet") {
  /**
   * It returns the packet name.
   * @returns The name of the packet.
   */
  name() {
    return "respawn";
  }

  /**
   * It returns the X cordinate.
   */
  getX() {
    return pos.x;
  }

  /*
   * It returns the Y cordinate.
   */
  getY() {
    return pos.y;
  }

  /*
   * It returns the Z cordinate.
   */
  getZ() {
    return pos.z;
  }

  /**
   * Returns the state of the packet.
   * @returns The state.
   */
  getState() {
    return state;
  }

  /**
   * Returns the runtime entity id.
   * @returns The runtime entity id.
   */
  getRuntimeEntityId() {
    return runtime_entity_id;
  }

  /**
   * Sets the X cordinate
   * @param {Number} x1
   */
  setX(x1) {
    pos.x = x1;
  }

  /**
   * Sets the Y cordinate
   * @param {Number} y1
   */
  setY(y1) {
    pos.y = y1;
  }

  /**
   * Sets the Z cordinate
   * @param {Number} z1
   */
  setZ(z1) {
    pos.z = z1;
  }

  /**
   * This functions sets the state.
   * @param {Number} state1
   */
  setState(state1) {
    state = state1;
  }

  /**
   * This function sets the runtime_entity_id
   * @param {Number} id1 - The Runtime ID of the entity
   */
  setRuntimeEntityId(id1) {
    runtime_entity_id = id1;
  }

  /**
   * Write packet to client
   * @param {Client} client
   */
  send(client) {
    client.write(this.name(), {
      position: pos,
      state: 1,
      runtime_entity_id: "0",
    });
  }
}

module.exports = Respawn;
