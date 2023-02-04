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
let cords = {
  x: 0,
  y: 0,
  z: 0,
};
let radius = 64;
let saved_chunks = [];

class NetworkChunkPublisherUpdate extends require("./Packet") {
  /**
   * It returns the packet name
   * @returns The packet name
   */
  name() {
    return "network_chunk_publisher_update";
  }

  /**
   * SetCords(x, y, z) {
   *     cords.x = x;
   *     cords.y = y;
   *     cords.z = z;
   * }
   * @param x - The x coordinate of the player.
   * @param y - The y coordinate of the player.
   * @param z - The z coordinate of the player.
   */
  setCords(x, y, z) {
    cords.x = x;
    cords.y = y;
    cords.z = z;
  }

  /**
   * The function setRadius() sets the radius
   * @param radius1 - The radius.
   */
  setRadius(radius1) {
    radius = radius1;
  }

  /**
   * It takes an array of chunks and sets the saved_chunks variable to that array.
   * @param chunks - An array of chunks.
   */
  setSavedChunks(chunks) {
    saved_chunks = chunks;
  }

  /**
   * It returns the value of the variable coordinates.
   * @returns The function getCords() is returning the variable coordinates.
   */
  getCords() {
    return cords;
  }

  /**
   * The function getRadius() returns the radius.
   * @returns The radius.
   */
  getRadius() {
    return radius;
  }

  /**
   * It returns the saved_chunks variable.
   * @returns The saved_chunks array.
   */
  getSavedChunks() {
    return saved_chunks;
  }

  /**
   * Sends the packet
   * @param client - The client that the packet is being sent to.
   */
  send(client) {
    this.validate(client);
    client.write(this.name(), {
      coordinates: this.getCords(),
      radius: this.getRadius(),
      saved_chunks: this.getSavedChunks(),
    });
  }
}

module.exports = NetworkChunkPublisherUpdate;
