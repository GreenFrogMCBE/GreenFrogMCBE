/**
* ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
* ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
* ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
* ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
* ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
* ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
*
* The content of this file is licensed using the CC-BY-4.0 license
* which requires you to agree to its terms if you wish to use or make any changes to it.
*
* @license CC-BY-4.0
* @link Github - https://github.com/andriycraft/GreenFrogMCBE
* @link Discord - https://discord.gg/UFqrnAbqjP
*/
const ServerLevelChunkPacket = require("../../network/packets/ServerLevelChunkPacket");

const WorldGenerators = require("../types/WorldGenerators");

const Generator = require("./Generator");

class Flat extends Generator {
    getName() {
        return WorldGenerators.FLAT;
    }

    generate(player) {
        const chunkData = Buffer.alloc(16 * 16 * 256);

        for (let i = 0; i < chunkData.length; i++) {
            if (i > 1 && i < 16) { // magic value
                chunkData[i] = 3 // dirt
            } else if (i < 2) {
                chunkData[i] = 7 // bedrock
            } else {
                chunkData[i] = 2 // grass
            }
        }

        const chunkRadius = player.world.getChunkRadius();

        for (let x = player.location.x - chunkRadius; x <= player.location.x + chunkRadius; x++) {
            for (let z = player.location.z - chunkRadius; z <= player.location.z + chunkRadius; z++) {
                const levelChunk = new ServerLevelChunkPacket();
                levelChunk.setX(x);
                levelChunk.setZ(z);
                levelChunk.setSubChunkCount(1);
                levelChunk.setCacheEnabled(false);
                levelChunk.setPayload(chunkData);
                levelChunk.writePacket(player);
            }
        }
    }
}

module.exports = Flat;
