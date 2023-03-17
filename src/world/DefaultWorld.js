const WorldGenerator = require("../network/packets/types/WorldGenerator");
const { config, lang } = require("../api/ServerInfo");
const PlayerInfo = require("../api/PlayerInfo");
const GameMode = require("../api/GameMode");
const Logger = require("../server/Logger");
const assert = require('assert');

let _time = 0

class DefaultWorld {
    constructor() {
        this.name = "";
        this.cords = {
            x: null,
            y: null,
            z: null,
        };
        this.chunkRadius = 0;
    }

    /**
     * Sets the world name
     * @param {String} name 
     */
    setName(name) {
        assert(name, "");
        this.name = name;
    }

    /**
     * Returns the world name
     * @returns The world name
     */
    getName() {
        return this.name;
    }

    /**
     * Returns the players that are in the world right now
     * @returns Players in world
     */
    getPlayersInWorld() {
        return PlayerInfo.players;
    }

    /**
     * Sets the coordinates for the world spawn
     * @param {Int} x 
     * @param {Int} y 
     * @param {Int} z 
     */
    setSpawnCoordinates(x, y, z) {
        this.cords = {
            x,
            y,
            z,
        };
    }

    /**
     * Returns the spawn coordinates
     */
    getSpawnCoordinates() {
        assert(this.cords.x !== null, null);
        assert(this.cords.y !== null, null);
        assert(this.cords.z !== null, null);

        return this.cords;
    }

    /**
     * Sets the chunk radius
     * @param {Number} radius
     */
    setChunkRadius(radius) {
        this.chunkRadius = radius
    }

    /**
     * Returns the chunk radius
     */
    getChunkRadius() {
        return this.chunkRadius
    }

    /**
     * Ticks the world
     * @private
     */
    tick() {
        try {
            if (config.tickWorldTime) {
                _time++
                for (const player of this.getPlayersInWorld()) {
                    if (player.offline) return // do shame me for this
                    player.setTime(_time)
                }
            }

            if (config.tickVoid) {
                for (const client of this.getPlayersInWorld()) {
                    const posY = Math.floor(client.y);

                    let min = -63;

                    if (config.generator === WorldGenerator.FLAT) {
                        min = -64
                    } else if (config.generator === WorldGenerator.VOID) {
                        min = NaN
                    }

                    if (posY <= min) {
                        if (client.gamemode === GameMode.CREATIVE || client.gamemode === GameMode.SPECTATOR) {
                            if (client.damage_loop) delete client.damage_loop;
                        } else if (!client.cannotbedamagedbyvoid) {
                            client.setHealth(client.health - 5);
                        }
                    } else {
                        if (client.damage_loop) delete client.damage_loop;
                    }
                }
            }
        } catch (e) {
            Logger.error(lang.errors.errorTickingWorld.replace("%e.stack%", e.stack))
        }
    }
}

module.exports = DefaultWorld;