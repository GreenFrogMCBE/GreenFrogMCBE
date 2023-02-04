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
let z = 0;
let sub_chunk_count = 0;
let cache_enabled = false;
let payload = [];
class LevelChunk extends require("./Packet") {
  /**
   * It returns the packet name
   */
  name() {
    return "level_chunk";
  }

  /**
   * It sets the X coordinate
   * @param {Number} x1
   */
  setX(x1) {
    x = x1;
  }

  /**
   * It sets the Z coordinate
   * @param {Number} z1
   */
  setZ(z1) {
    z = z1;
  }

  /**
   * It sets the sub chunk count
   * @param {Number} count
   */
  setSubChunkCount(count) {
    sub_chunk_count = count;
  }

  /**
   * It sets if the cache is enabled
   * @param {Boolean} enabled
   */
  setCacheEnabled(enabled) {
    cache_enabled = enabled;
  }

  /**
   * It sets if the payload
   * @param {any} data
   */
  setPayload(data) {
    payload = data;
  }

  /**
   * It gets the X coordinate
   * @returns {Number}
   */
  getX() {
    return x;
  }

  /**
   * It gets the Z coordinate
   * @returns {Number}
   */
  getZ() {
    return z;
  }

  /**
   * It gets the sub chunk count
   * @returns {Number}
   */
  getSubChunkCount() {
    return sub_chunk_count;
  }

  /**
   * It gets if the cache is enabled
   * @returns {Boolean}
   */
  getCacheEnabled() {
    return cache_enabled;
  }

  /**
   * It gets if the payload
   * @returns {any}
   */
  getPayload() {
    return payload;
  }

  /**
   * It sends the packet
   * @param {Client} client
   */
  send(client) {
    client.write(this.name(), {
      x: x,
      z: z,
      sub_chunk_count: sub_chunk_count,
      cache_enabled: cache_enabled,
      payload: { type: "Buffer", data: payload },
    });
  }
}

module.exports = LevelChunk;
