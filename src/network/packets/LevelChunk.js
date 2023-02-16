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
let highest_subchunk_count = 0
let cache_enabled = false;
let payload = [];

class LevelChunk extends require("./Packet") {
  /**
   * @returns The name of the packet.
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
   * It sets the highest subchunk count
   * @param {Number} highest_subchunk_count1 
   */
  setHighestSubchunkCount(highest_subchunk_count1) {
    highest_subchunk_count = highest_subchunk_count1
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
   * It gets the payload
   * @returns {any}
   */
  getPayload() {
    return payload;
  }

  /**
   * It returns the highest sub chunk count
   * @returns {Number}
   */
  getHighestSubchunkCount() {
    return highest_subchunk_count
  }

  /**
   * It sends the packet
   * @param {Client} client
   */
  send(client) {
    client.write(this.name(), {
      x: this.getX(),
      z: this.getZ(),
      sub_chunk_count: this.getSubChunkCount(),
      highest_subchunk_count: this.getHighestSubchunkCount(),
      cache_enabled: this.getCacheEnabled(),
      payload: { type: "Buffer", data: this.getPayload() },
    });
  }
}

module.exports = LevelChunk;
