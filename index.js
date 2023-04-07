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
const fs = require("fs");
const center = require("center-align")

console.info(center(`\x1b[32m  
██████  ██████  ███████ ███████ ███    ██ ███████ ██████   ██████   ██████  
██       ██   ██ ██      ██      ████   ██ ██      ██   ██ ██    ██ ██       
██   ███ ██████  █████   █████   ██ ██  ██ █████   ██████  ██    ██ ██   ███ 
██    ██ ██   ██ ██      ██      ██  ██ ██ ██      ██   ██ ██    ██ ██    ██ 
██████  ██   ██ ███████ ███████ ██   ████ ██      ██   ██  ██████   ██████  
\x1b[0m`, process.stdout.columns))

try {
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

motd: '§aGreenFrog server'
maxPlayers: 20
version: '1.19.70'
offlineMode: true
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
debug: false
crashCode: -1
exitCode: 0
logUnhandledPackets: false
defaultPermissionLevel: 2
# Permission levels are: 
# 4 - operator
# 3 - unknown
# 2 - member
# 1 - unknown
# 0 - visitor
multiProtocol: false # Supports 1.19.70+. Some features may be broken

# WORLD SETTINGS
#
# This section contains world settings

gamemode: "creative" # Valid gamemodes are "creative", "survival", "spectator", "adventure" and "fallback"
worldGamemode: "creative" # Valid gamemodes are "creative", "survival", "spectator", "adventure" and "fallback"
difficulty: 0 # Currently only visual
generator: "default" # Can be default, flat (superflat), or void (empty)

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
consoleCommandList: true
playerCommandVersion: true
playerCommandPlugins: true
playerCommandStop: true
playerCommandSay: true
playerCommandOp: true
playerCommandKick: true
playerCommandTime: true
playerCommandDeop: true
playerCommandList: true
playerCommandGamemode: true

# PERFORMANCE SETTINGS
#
# Allows to make your server faster

garbageCollectorDelay: 60000

tickEvent: true # Should ServerTickEvent be enabled?
tickWorldTime: true # Should time update be server side?
tickVoid: true # Should people that are in void take damage?
tickRegeneration: true # Should people in survival mode regenerate their health?
tickStarvationDamage: true # Should people take damage if their food level is 0?
randomTickSpeed: 1000`
		);
	}
	const Frog = require("./src/Server.js");
	Frog.start();
} catch (e) {
	console.clear()

	console.error(`\x1b[31mFailed to start server
${e}

Make sure that you have the required libraries. Run "npm i" to install them
If you are sure that this is a bug please report it here: https://github.com/andriycraft/GreenFrogMCBE
\x1b[0m
`);
	process.exit(-1);
}

process.once("SIGINT", async () => {
	await require("./src/Server").shutdown();
});
