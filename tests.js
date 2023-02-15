const fs = require("fs");
const yaml = require("js-yaml");

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
playerCommandTime: true
playerCommandDeop: true`
            );
        }
        const Frog = require("./src/Server.js");
        await Frog.start();
        setTimeout(() => {
            try {
                require("./src/server/ShutdownAPI.js");
            } finally {
                try {
                    console.log(`\n\nTest 1 passed`)
                    console.log('\nRunning test 2: JSON parsing config files')

                    const files = [
                        "/src/lang/en_US.json",
                        "/src/lang/lt_LT.json",
                        "/src/lang/uk_UA.json",
                        "/src/lang/vi_VN.json",
                        "/src/lang/fr_FR.json",
                        "/src/network/packets/res/biomes.json",
                        "/src/network/packets/res/creativecontent.json",
                        "/src/network/packets/res/entities.json",
                        "/package.json"
                    ];

                    for (const file of files) {
                        console.log(`Parsing: ${file}`)
                        JSON.parse(JSON.stringify(require(__dirname + file)));
                    }

                    console.log('Parsing: config.yml')
                    yaml.load(fs.readFileSync("config.yml", "utf8"))

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