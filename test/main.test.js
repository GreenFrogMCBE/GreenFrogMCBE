const fs = require("fs");
const yaml = require("js-yaml");
const protocol = require("frog-protocol");

const Frog = require("../src/Frog");
const ConsoleCommandSender = require("../src/server/ConsoleCommandSender");

describe("config files", () => {
    const configFiles = [
        // .json files
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

        // .yml files
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
})

describe("commands", () => {
    const commandsDir = __dirname + "/../src/commands/";
    for (const commandFile of fs.readdirSync(commandsDir)) {
        if (fs.statSync(commandsDir + commandFile).isFile()) {
            const command = new (require(commandsDir + commandFile));

            Frog.eventEmitter.on("serverCommandProcessError", (event) => {
                throw event.error;
            })

            if (command.name == "stop" || !command.name) continue;

            it("can execute /" + command.name, () => {
                ConsoleCommandSender.executeCommand(command.name)
            })
        }
    }
});

describe("client", async () => {
    it("can join", async () => {
        protocol.createClient({
            host: "127.0.0.1",
            port: 19132,
            username: "joinBot",
            offline: true
        }).on("close", (reason) => {
            throw new Error("Connection closed: " + reason)
        })
    })

    it("can send a message", async () => {
        const client = protocol.createClient({
            host: "127.0.0.1",
            port: 19132,
            username: "messageBot",
            offline: true
        }).on("close", (packet) => {
            throw new Error("Connection closed: " + packet.data.params.reason)
        }).on("spawn", () => {
            client.queue("text", {
                type: 'chat',
                needs_translation: false,
                source_name: client.username,
                xuid: '',
                platform_chat_id: '',
                message: 'hi'
            })
        })
    })

    it("can send a command", async () => {
        const client = protocol.createClient({
            host: "127.0.0.1",
            port: 19132,
            username: "commandBot",
            offline: true
        }).on("close", (packet) => {
            throw new Error("Connection closed: " + packet.data.params.reason)
        }).on("spawn", () => {
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

            Frog.shutdownServer();
        })
    })
})

