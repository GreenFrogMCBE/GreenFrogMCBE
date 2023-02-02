class InventorySlot extends require("./Packet") {
    name() {
        return "inventory_slot"
    }

    validate(client) {
        if (!client) throw new Error("Packet processing error. Client is null")
    }

    writePacket(client, itemlength = 0, item = 0, count = 0, runtime_id = 0) {
        this.validate(client)
        client.write(this.name(), {
            "window_id": "inventory",
            "slot": itemlength,
            "item": {
                "network_id": item,
                "count": count,
                "metadata": 0,
                "has_stack_id": 1,
                "stack_id": 1,
                "block_runtime_id": runtime_id,
                "extra": {
                    "has_nbt": 0,
                    "can_place_on": [],
                    "can_destroy": []
                }
            }
        })
    }
}

module.exports = InventorySlot