const PacketHandlingError = require("../exceptions/PacketHandlingError");
const InventorySlot = require("../InventorySlot");
const Handler = require("./Handler");

class ItemStackRequest extends Handler {
  validate(client) {
    if (client.gamemode == !1)
      throw new PacketHandlingError(
        "An attempt to get items from creative mode, while not in creative mode"
      );
  }

  handle(client, packet) {
    this.validate(client);
    let item = null;
    let runtime_id = null;
    let count = null;
    try {
      runtime_id =
        packet.data.params.requests[0].actions[1].result_items[0]
          .block_runtime_id;
    } catch (e) {
      runtime_id = 0;
    }
    try {
      count = packet.data.params.requests[0].actions[1].result_items[0].count;
    } catch (e) {
      count = 0;
    }
    try {
      item =
        packet.data.params.requests[0].actions[1].result_items[0].network_id;
    } catch (e) {
      item = 0;
    }

    InventorySlot.prototype.writePacket(
      client,
      client.items.length,
      item,
      count,
      runtime_id
    );
    client.items.push(item);
    client.items2 = [];
    for (let i = 0; i < client.items.length; i++) {
      if (client.items[i] == 0) {
        client.items[i - 1] = -69420;
        client.items[i] = -69420;
      }
    }
    for (let i = 0; i < client.items.length; i++) {
      if ((client.items = -69420)) {
      } else {
        client.items2.push(client.items);
      }
    }
  }
}

module.exports = ItemStackRequest;
