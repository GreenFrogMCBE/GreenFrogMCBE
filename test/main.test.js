process.env.TEST = true;
process.env.DEBUG = true;

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const protocol = require("frog-protocol");
const util = require("minecraft-server-util");

const ConsoleCommandSender = require("../src/server/ConsoleCommandSender");

describe("config files", () => {
	const configFiles = [
		"../.eslintrc.json",
		"../renovate.json",
		"../src/resources/availableEntities.json",
		"../src/resources/biomeDefinitions.json",
		"../src/resources/creativeContent.json",
		"../src/resources/entityData.json",
		"../src/resources/featureRegistry.json",
		"../src/resources/itemStates.json",
		"../src/resources/skinData.json",
		"../src/resources/trimData.json",
		"../src/resources/defaultConfig.yml"
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
								type: "player",
							},
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
