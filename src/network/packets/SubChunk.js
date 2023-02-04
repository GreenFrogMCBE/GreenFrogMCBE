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
   * It returns the string "subchunk"
   * @returns The name of the packet.
   */
  name() {
    return "subchunk";
  }

  /**
   * SetDimension(dimension) {
   *     dimension1 = dimension;
   * }
   * @param dimension - The dimension.
   */
  setDimension(dimension) {
    dimension1 = dimension;
  }

  /**
   * SetX(x) {
   *     x1 = x;
   * }
   * @param x - The x cordinate.
   */
  setX(x1) {
    x = x1;
  }

  /**
   * SetY(y) {
   *     y1 = y;
   * }
   * @param y - The y cordinate.
   */
  setY(y1) {
    y = y1;
  }

  /**
   * SetZ(z) {
   *     z1 = z;
   * }
   * @param z - The z cordinate.
   */
  setZ(z1) {
    z = z1;
  }

  /**
   * SetOrigin(x1, y1, z1) {
   *   ox = x1;
   *   oy = y1;
   *   oz = z1;
   * }
   * @param x1 - The x cordinate.
   * @param y1 - The y cordinate.
   * @param z1 - The z cordinate.
   */
  setOrigin(x1, y1, z1) {
    ox = x1;
    oy = y1;
    oz = z1;
  }

  /**
   * SetData(data) {
   *     data1 = data;
   * }
   * @param data - The data.
   */
  setData(data1) {
    data = data1;
  }

  /**
   * SetRequestResult(result) {
   *     result1 = result;
   * }
   * @param result - The result.
   */
  setRequestResult(result1) {
    result = result1;
  }

  /**
   * SetHeightMapType(heightMaptype) {
   *   heightMaptype1 = heightMaptype;
   * }
   * @param heightMaptype - The heightMaptype.
   */
  setHeightMapType(heightMaptype1) {
    heightMaptype = heightMaptype1;
  }

  /**
   * SetHeightMap(heightMap) {
   *  heightMap1 = heightMap;
   * }
   * @param heightMap - The heightMap.
   */
  setHeightMap(heightMap1) {
    heightMap = heightMap1;
  }

  /**
   * SetCacheEnabled(cacheEnabled) {
   *  cacheEnabled1 = cacheEnabled;
   * }
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
    return dimension1;
  }

  /**
   * It returns the x cordinate.
   * @returns The x cordinate.
   */
  getX() {
    return x;
  }

  /**
   * It returns the y cordinate.
   * @returns The y cordinate.
   */
  getY() {
    return y;
  }

  /**
   * It returns the z cordinate.
   * @returns The z cordinate.
   */
  getZ() {
    return z;
  }

  /**
   * It returns the origin.
   * @returns The origin x, y, and z coordinates
   */
  getOrigin() {
    return { x: ox, y: oy, z: oz };
  }

  /**
   * Returns the data.
   * @returns The data
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
