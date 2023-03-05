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
const PacketHandlingError = require("../exceptions/PacketHandlingError");
const { lang } = require("../../../lang/en_US.json");
const ContainerOpen = require("../ContainerOpen");
const Handler = require("./Handler");

class Interact extends Handler {
	handle(packet, client) {
		switch (packet.data.params.action_id) {
			case "open_inventory": {
				const co = new ContainerOpen();
				co.setWindowId(-1);
				co.setWindowType("inventory");
				co.setRuntimeEntityId(2);
				co.setCoordinates(0, 0, 0);
				co.send(client);
				break;
			}
			case "mouse_over_entity": {
				// TODO: PVP is not implemented yet
				break;
			}
			default: {
				throw new PacketHandlingError(lang.notSupportedActionID.replace("%ai%", packet.data.params.action_id));
			}
		}
	}
}

module.exports = Interact;
