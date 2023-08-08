/* eslint-disable no-unused-vars */

class Command {
    /** @type {string | undefined} */
    name
    /** @type {string | undefined} */
    description
    /** @type {number | undefined} */
    minArgs
    /** @type {number | undefined} */
    maxArgs
    /** @type {boolean | undefined} */
    requiresOp
    /** @type {string[] | undefined} */
    aliases;

    /**
     * @param {import("Frog").Player} player 
     * @param {import("frog-protocol").Server} server 
     * @param {string[]} args 
     */
    execute(player, server, args) {}
}

module.exports = Command;