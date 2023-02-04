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
const ContainerOpen = require("../ContainerOpen");
const PacketHandlingError = require("../exceptions/PacketHandlingError");
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
      }
      case "mouse_over_entity": {
        // TODO. Pvp is not implemented yet
        break;
      }
      default: {
        throw new PacketHandlingError(
          "Not supported packet data: packet = open_inventory, action_id = " +
            packet.data.params.action_id
        );
      }
    }
  }
}

module.exports = Interact;
