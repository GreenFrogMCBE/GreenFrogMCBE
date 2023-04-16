const { readdir } = require('fs/promises')

module.exports = {
    /** Command list */
    commandList: [],

    /**
     * Loads all commands
     */
    async loadAllCommands() {
        for (const command of await readdir("./src/commands")) {
            const cmd = require("../commands/" + command)

            this.commandList.push(cmd)
        }
    }
}