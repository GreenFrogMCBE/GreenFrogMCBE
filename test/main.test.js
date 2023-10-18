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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const protocol = require("frog-protocol");
const util = require("minecraft-server-util");

const ConsoleCommandSender = require("../src/server/ConsoleCommandSender");

before(() => {
	process.env.TEST = true;
	process.env.DEBUG = true;
});

describe("config files", () => {
	const configFiles = [
		// Resources
		"../src/resources/json/availableEntities.json",
		"../src/resources/json/biomeDefinitions.json",
		"../src/resources/json/creativeContent.json",
		"../src/resources/json/entityData.json",
		"../src/resources/json/featureRegistry.json",
		"../src/resources/json/itemStates.json",
		"../src/resources/json/skinData.json",
		"../src/resources/json/trimData.json",

		// Config
		"../src/resources/yml/defaultConfig.yml",

		// Misc
		"../.eslintrc.json",
		"../renovate.json"
	];

	for (const file of configFiles) {
		it(`can parse ${file}`, () => {
			if (file.endsWith(".json")) {
				require(file);
			} else if (file.endsWith(".yml")) {
				yaml.load(fs.readFileSync(file, "utf8"));
			}
		});
	}
});

describe("server", () => {
	it("can start", async () => {
		await require("../index");

		describe("commands", () => {
			const commandsDir = path.join(__dirname, "..", "src", "commands");

			for (const commandFile of fs.readdirSync(commandsDir)) {
				if (fs.statSync(path.join(commandsDir, commandFile)).isFile()) {
					const command = new (require(path.join(commandsDir, commandFile)))();

					if (command.name == "stop" || !command.name) continue;

					it(`can execute /${command.name}`, () => {
						ConsoleCommandSender.executeCommand(command.name);
					});
				}
			}
		});

		describe("query", () => {
			it("can respond with basic info", async () => {
				const basicInfo = await util.queryBasic("0.0.0.0", 19133);
				console.log(`Basic info: ${JSON.stringify(basicInfo)}`);
			});

			it("can respond with full info", async () => {
				const fullInfo = await util.queryFull("0.0.0.0", 19133);
				console.log(`Full info: ${JSON.stringify(fullInfo)}`);
			});
		});

		describe("client", () => {
			it("can join", () => {
				const client = protocol.createClient({
					host: "127.0.0.1",
					port: 19132,
					username: "joinBot",
					offline: true
				});

				client.on("disconnect", () => {
					throw new Error("Connection closed");
				});
			});

			it("can send a message", () => {
				const client = protocol.createClient({
					host: "127.0.0.1",
					port: 19132,
					username: "messageBot",
					offline: true
				});

				client.on("close", () => {
					throw new Error("Connection closed");
				});

				client.on("spawn", () => {
					client.queue("text", {
						type: "chat",
						needs_translation: false,
						source_name: client.username,
						xuid: "",
						platform_chat_id: "",
						message: "hi"
					});
				});
			});

			it("can send a command", () => {
				const client = protocol.createClient({
					host: "127.0.0.1",
					port: 19132,
					username: "commandBot",
					offline: true
				});

				client.on("close", () => {
					throw new Error("Connection closed");
				});

				client.on("packet", (packet) => {
					if (packet.data.name === "start_game") {
						client.queue("command_request", {
							command: "pl",
							internal: false,
							version: 70,
							origin: {
								uuid: client.profile.uuid,
								request_id: client.profile.uuid,
								type: "player"
							}
						});

						setTimeout(() => {
							const Frog = require("../src/Frog");
							Frog.shutdownServer();
						}, 1000);
					}
				});
			});
		});
	});
});
