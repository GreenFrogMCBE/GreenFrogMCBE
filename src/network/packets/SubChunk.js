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

let dimension = 0;
let x = 0;
let y = 0;
let z = 0;
let ox = 0;
let oy = 0;
let oz = 0;
let result = "";
let data = [];
let heightMaptype = 0;
let heightMap = [];
let cache_enabled = false;

class SubChunk extends require("./Packet") {
  /**
   * @returns The name of the packet.
   */
  name() {
    return "subchunk";
  }

  /**
   * It sets the dimension of the subchunk.
   * @param dimension - The dimension.
   */
  setDimension(dimension1) {
    dimension = dimension1;
  }

  /**
   * It sets the X coordinate of the subchunk.
   * @param x - The X coordinate.
   */
  setX(x1) {
    x = x1;
  }

  /**
   * It sets the Y coordinate of the subchunk.
   * @param y - The Y coordinate.
   */
  setY(y1) {
    y = y1;
  }

  /**
   * It sets the Z coordinate of the subchunk.
   * @param z - The Z cordinate.
   */
  setZ(z1) {
    z = z1;
  }

  /**
   * It sets the X, Y and Z coordinate of the origin in subchunk.
   * @param x1 - The X cordinate.
   * @param y1 - The Y cordinate.
   * @param z1 - The Z cordinate.
   */
  setOrigin(x1, y1, z1) {
    ox = x1;
    oy = y1;
    oz = z1;
  }

  /**
   * It sets the packet data
   * @param data - The packet data.
   */
  setData(data1) {
    data = data1;
  }

  /**
   * It sets request result
   * @param result - The request result.
   */
  setRequestResult(result1) {
    result = result1;
  }

  /**
   * It sets the height map type.
   * @param heightMaptype - The height map type.
   */
  setHeightMapType(heightMaptype1) {
    heightMaptype = heightMaptype1;
  }

  /**
   * It sets the height map.
   * @param heightMap - The height map.
   */
  setHeightMap(heightMap1) {
    heightMap = heightMap1;
  }

  /**
   * It sets the if cache enabled.
   * @param cacheEnabled - Is cache enabled.
   */
  setCacheEnabled(cacheEnabled1) {
    cache_enabled = cacheEnabled1;
  }

  /**
   * It returns the dimension.
   * @returns The dimension.
   */
  getDimension() {
    return dimension;
  }

  /**
   * It returns the X cordinate.
   * @returns The X cordinate.
   */
  getX() {
    return x;
  }

  /**
   * It returns the Y cordinate.
   * @returns The Y cordinate.
   */
  getY() {
    return y;
  }

  /**
   * It returns the Z cordinate.
   * @returns The Z cordinate.
   */
  getZ() {
    return z;
  }

  /**
   * It returns the origin.
   * @returns The origin X, Y, and Z coordinates
   */
  getOrigin() {
    return { x: ox, y: oy, z: oz };
  }

  /**
   * Returns the packet data.
   * @returns The packet data
   */
  getData() {
    return data;
  }

  /**
   * Returns the request result.
   * @returns The request result
   */
  getRequestResult() {
    return result;
  }

  /**
   * It returns the height map type.
   * @returns The height map type.
   */
  getHeightMapType() {
    return heightMaptype;
  }

  /**
   * It returns the height map.
   * @returns The height map.
   */
  getHeightMap() {
    return heightMap;
  }

  /**
   * Returns the cache enabled.
   * @returns It returns if the cache is enabled.
   */
  getCacheEnabled() {
    return cache_enabled;
  }

  /**
   * It writes a packet to the client
   * @param client - The client that will receive the packet.
   */
  send(client) {
    client.write(this.name(), {
      dimension: this.getDimension(),
      x: this.getX(),
      y: this.getY(),
      z: this.getZ(),
      origin: this.getOrigin(),
      data: {
        type: "Buffer",
        data: this.getData(),
      },
      request_result: this.getRequestResult(),
      heightmap_type: this.getHeightMapType(),
      heightmap: {
        type: "Buffer",
        data: this.getHeightMap(),
      },
      cache_enabled: this.getCacheEnabled(),
    });
  }
}

module.exports = SubChunk;
