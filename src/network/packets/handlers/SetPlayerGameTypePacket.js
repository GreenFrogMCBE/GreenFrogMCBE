const PacketHandlingError = require("../exceptions/PacketHandlingError")

class SetPlayerGameTypePacket extends require("./Handler") {
	validate (client, packet) {
        if (!packet.data.params.gamemode) throw new PacketHandlingError("Bad gamemode packet - Bad gamemode")

        if (!client.op) throw new PacketHandlingError("Bad gamemode packet - Tried to switch gamemode, while not opped")
    }

    handle(client, packet) {
        this.validate(client, packet)

        client.setGamemode(packet.data.params.gamemode)
    }
}

module.exports = SetPlayerGameTypePacket