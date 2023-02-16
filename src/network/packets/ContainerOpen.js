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
let window_id = 0;
let cords = {
  x: 0,
  y: 0,
  z: 0,
};
let window_type = "";
let runtime_entity_id = 0;

class ContainerOpen extends require("./Packet") {
  /**
   * @returns The name of the packet.
   */
  name() {
    return "container_open";
  }

  /**
   * It sets the window id
   * @param {number} window_id
   */
  setWindowId(window_id1) {
    window_id = window_id1;
  }

  /**
   * It sets the coordinates
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  setCoordinates(x, y, z) {
    cords = {
      x: x,
      y: y,
      z: z,
    };
  }

  /**
   * It sets the window type
   * @param {string} window_type
   */
  setWindowType(window_type1) {
    window_type = window_type1;
  }

  /**
   * It sets the runtime entity id
   * @param {Number} runtime_entity_id1
   */
  setRuntimeEntityId(runtime_entity_id1) {
    runtime_entity_id = runtime_entity_id1;
  }

  /**
   * It returns the window id
   * @returns The window id
   */
  getWindowId() {
    return window_id;
  }

  /**
   * It returns the runtime entity id
   * @returns The runtime entity id
   */
  getCoordinates() {
    return cords;
  }

  /**
   * It returns the window type
   * @returns The window type
   */
  getWindowType() {
    return window_type;
  }

  /**
   * It returns the runtime entity id
   * @returns The runtime entity id
   */
  getRuntimeEntityId() {
    return runtime_entity_id;
  }

  /**
   * It sends the packet
   * @param {Object} client
   */
  send(client) {
    client.write(this.name(), {
      window_id: this.getWindowId(),
      window_type: this.getWindowType(),
      coordinates: this.getCoordinates(),
      runtime_entity_id: this.getRuntimeEntityId(),
    });
  }
}

module.exports = ContainerOpen;
