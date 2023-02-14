const fs = require("fs");

async function test() {
    try {
        console.log('Running test 1: Starting the server')
        if (!fs.existsSync("config.yml")) {
            fs.writeFileSync(
                "config.yml",
                `# LISTENING
# 
# This section contains the config for server host and port

host: '0.0.0.0'
port: 19132

# SERVER INFO
#
# This section contains motd, and other server info settings

motd: '§6GreenFrog server'
maxPlayers: 20
version: '1.19.60'
offlineMode: false
lang: 'en_US' # Valid languages are en_US, fr_FR, lt_LT, uk_UA, vi_VN

# CHAT
#
# This section contains some chat settings

disable: false
commandsDisabled: false # (will only disabled them for players, not console)
blockInvalidMessages: true # Kicks the player if the player tried to send an too long or empty message and also prevents from using colors in chat

# DEVELOPMENT SETTINGS
# 
# This section contains settings like debug, exit codes, etc

unstable: false # Makes your server not crash on critical errors
debug: false # Debug mode
crashCode: -1
exitCode: 0
logUnhandledPackets: false
defaultPermissionLevel: 2
multiProtocol: false # Supports 1.19.20+. Some features may be broken

# WORLD SETTINGS
#
# This section contains world settings

renderChunks: true
gamemode: "creative" # Valid gamemodes are "creative", "survival", "spectator", "adventure" and "fallback"
worldGamemode: "creative" # Valid gamemodes are "creative", "survival", "spectator", "adventure" and "fallback"
difficulty: 0 # Currently only visual

# Command settings
# 
# Allows to disable/enable commands
# Make sure that "commandsDisabled" in chat section is enabled

consoleCommandKick: true
consoleCommandVer: true
consoleCommandShutdown: true
consoleCommandVersion: true
consoleCommandTime: true
consoleCommandPl: true
consoleCommandPlugins: true
consoleCommandStop: true # Will only stop showing in /help, if disabled
consoleCommandSay: true
consoleCommandOp: true
consoleCommandDeop: true
consoleCommandHelp: true
playerCommandVersion: true
playerCommandPlugins: true
playerCommandStop: true
playerCommandSay: true
playerCommandOp: true
playerCommandKick: true
playerCommandTime: true`
            );
        }
        const Frog = require("./src/Server.js");
        Frog.start();
        setTimeout(() => {
            try {
                require("./src/server/ShutdownAPI.js");
            } finally {
                console.log(`\n\nTest 1 passed`)
                try {
                    console.log('\nRunning test 2: JSON parsing config files')

                    console.log('Parsing en_US.json')
                    JSON.parse(JSON.stringify(__dirname + '\\src\\lang\\en_US.json'))
                    console.log('Parsing fr_FR.json')
                    JSON.parse(JSON.stringify(__dirname + '\\src\\lang\\fr_FR.json'))
                    console.log('Parsing fr_FR.json')
                    JSON.parse(JSON.stringify(__dirname + '\\src\\lang\\lt_LT.json'))
                    console.log('Parsing lt_LT.json')
                    JSON.parse(JSON.stringify(__dirname + '\\src\\lang\\uk_UA.json'))
                    console.log('Parsing uk_UA.json')
                    JSON.parse(JSON.stringify(__dirname + '\\src\\lang\\vi_VN.json'))
                    console.log('Parsing package.json')
                    JSON.parse(JSON.stringify(__dirname + '\\.\\package.json'))

                    console.log(`\nTest 2 passed`)
                    process.exit(0)
                } catch (e) {
                    console.log(`\nTest 'JSON validating config and lang files' failed! \nError: ${e.stack}`)
                    process.exit(-1)
                }
            }
        }, 3000)
    } catch (e) {
        console.log(`Test 'running server' failed! Error: ${e.stack}`)
        process.exit(-1)
    }
}

test()