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

const Frog = require("../src/Frog");

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
	it("can start", () => {
		process.env.TEST = true;
		process.env.DEBUG = true;

		require("../index");
	});

	it("can broadcast a message", () => {
		Frog.broadcastMessage("Hello, World!");
	});
});

describe("commands", () => {
	const commandsDir = path.join(__dirname, "..", "src", "commands", "\\");

	Frog.eventEmitter.on("serverCommandProcessError", (event) => {
		throw event.error;
	});

	for (const commandFile of fs.readdirSync(commandsDir)) {
		if (fs.statSync(commandsDir + commandFile).isFile()) {
			const command = new (require(commandsDir + commandFile));

			if (command.name == "stop" || !command.name) continue;

			it("can execute /" + command.name, () => {
				ConsoleCommandSender.executeCommand(command.name);
			});
		}
	}
});

describe("query", () => {
	it("can respond with basic info", async () => {
		console.log(`Basic info: ${JSON.stringify(await util.queryBasic("0.0.0.0", 19133))}`);
	});

	it("can respond with full info", async () => {
		console.log(`Full info: ${JSON.stringify(await util.queryFull("0.0.0.0", 19133))}`);
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
					Frog.shutdownServer();
				}, 1000);	
			}
		});
	});
});
