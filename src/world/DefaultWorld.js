const PlayerInfo = require("../player/PlayerInfo");
const { config } = require("../server/ServerInfo");
const Logger = require("../server/Logger");

class DefaultWorld {
    constructor() {
        this.name = "";
        this.cords = {
            x: null,
            y: null,
            z: null,
        };
        this.chunkRadius = 0;
        this._time = 0; /* DO NOT USE IN PLUGIN APIS */
    }

    /**
     * Sets the world name
     * @param {String} name 
     */
    setName(name) {
        console.assert(name, "");
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
        console.assert(this.cords.x !== null, null);
        console.assert(this.cords.y !== null, null);
        console.assert(this.cords.z !== null, null);

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
     * Ticks the world (DO NOT USE IN YOUR PLUGIN BECAUSE THIS WILL BREAK THE SERVER!!!)
     */
    tick() {
        try {
            if (config.tickWorldTime) {
                for (let i = 0; i < this.getPlayersInWorld(); i++) {
                    this._time++
                    this.getPlayersInWorld()[i].setTime(this._time++)
                }
            }
        } catch (e) {
            Logger.error("Exception ticking world! " + e.stack)
        }
    }
}

module.exports = DefaultWorld;