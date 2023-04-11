module.exports = {
    /**
     * Converts Minecraft color codes to NodeJS colors that can be used in console
     * 
     * @param {String} string The string with Minecraft color codes to convert
     * @returns {String} The converted string with NodeJS console color codes
     */
    convertConsoleColor(string) {
        const colors = {
            '§0': '\x1b[30m', // black
            '§1': '\x1b[34m', // dark blue
            '§2': '\x1b[32m', // dark green
            '§3': '\x1b[36m', // dark aqua
            '§4': '\x1b[31m', // dark red
            '§5': '\x1b[35m', // dark purple
            '§6': '\x1b[33m', // gold
            '§7': '\x1b[37m', // gray
            '§8': '\x1b[90m', // dark gray
            '§9': '\x1b[94m', // blue
            '§a': '\x1b[92m', // green
            '§b': '\x1b[96m', // aqua
            '§c': '\x1b[91m', // red
            '§d': '\x1b[95m', // light purple
            '§e': '\x1b[93m', // yellow
            '§f': '\x1b[97m', // white
            '§r': '\x1b[0m',  // reset
        };

        for (const color in colors) {
            string = string.replace(new RegExp(color, 'g'), colors[color]);
        }

        return string + '\x1b[0m';
    },
};
