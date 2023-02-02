const AvailableCommands = require("../network/packets/AvailableCommands")

let commands = []

class CommandManager {
    getPacket(client) {
        return client.commands
    }

    init(client) {
        client.commands = {
            "values_len": 0,
            "_enum_type": "byte",
            "enum_values": [],
            "suffixes": [],
            "enums": [],
            "command_data": [],
            "dynamic_enums": [],
            "enum_constraints": []
        }
    }

    getCommands() {
        return commands
    }

    addCommand(client, name, description) {
        client.commands.command_data.push({
            "name": name,
            "description": description,
            "flags": 0,
            "permission_level": 0,
            "alias": -1,
            "overloads": [
                [
                    {
                        "parameter_name": "args",
                        "value_type": "raw_text",
                        "enum_type": "valid",
                        "optional": true,
                        "options": {
                            "unused": 0,
                            "collapse_enum": 0,
                            "has_semantic_constraint": 0,
                            "as_chained_command": 0,
                            "unknown2": 0
                        }
                    }
                ]
            ]
        })
        commands.push({
            name,
            description
        })
        AvailableCommands.prototype.writePacket(client, this.getPacket(client))
    }
}

module.exports = CommandManager