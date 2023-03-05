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
const ClientRunCommand = require("../test/ClientRunCommand");
const ClientSendMessage = require("../test/ClientSendMessage");
const ClientJoin = require("../test/ClientJoin");
const StartServer = require("../test/StartServer");
const TestConfigs = require("../test/TestConfigs");
const fs = require("fs");

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

motd: '§aDedicated GreenFrog server'
maxPlayers: 20
version: '1.19.63'
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
debug: false # Debug mode
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
multiProtocol: false # Supports 1.19.20+. Some features may be broken

# WORLD SETTINGS
#
# This section contains world settings

renderChunks: true
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
playerCommandGamemode: true`
);

console.log("Starting testing...");

try {
	StartServer.test();
} catch (e) {
	console.log("Tests failed! Failed to start the server! " + e.stack);
	process.exit(-1);
}

setTimeout(() => {
	try {
		TestConfigs.test();
	} catch (e) {
		console.log("Tests failed! Failed to test the configs! " + e.stack);
		process.exit(-1);
	} finally {
		setTimeout(() => {
			try {
				ClientJoin.test();
			} catch (e) {
				console.log("Tests failed! Failed to join with client! " + e.stack);
				process.exit(-1);
			} finally {
				setTimeout(() => {
					try {
						ClientRunCommand.test();
					} catch (e) {
						console.log("Tests failed! Failed to run command: /pl! " + e.stack);
						process.exit(-1);
					} finally {
						setTimeout(() => {
							setTimeout(() => {
								try {
									ClientSendMessage.test();
								} catch (e) {
									console.log("Tests failed! Failed to send a chat message! " + e.stack);
									process.exit(-1);
								} finally {
									setTimeout(() => {
										console.log("Tests passed");
										process.exit(0);
									}, 10000);
								}
							}, 3000);
						}, 10000);
					}
				}, 10000);
			}
		}, 10000);
	}
}, 3500);
