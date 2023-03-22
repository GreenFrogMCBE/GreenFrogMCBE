const PacketConstructor = require("./PacketConstructor");

let value = {}
let properties = {}
let tick = -1;
let runtime_entity_id = ""

class ServerSetEntityDataPacket extends PacketConstructor {
    /**
     * Returns the packet name
     * @returns {String} The name of the packet
     */
    getPacketName() {
        return "set_entity_data";
    }

    /**
     * Returns if is the packet critical?
     * @returns {Boolean} Returns if the packet is critical
     */
    isCriticalPacket() {
        return false
    }
    
    /**
     * Sets the field value for the player
     * @param {String} field 
     * @param {Boolean} new_value 
     */
    setValue (field, new_value) {
        value[field] = new_value 
    }

    /**
     * Returns the field value
     * @returns {JSON}
     */
    getFieldValue() {
        return value
    }

    setProperties(new_properties) {
        properties = new_properties
    }

    getProperties() {
        return properties
    }

    setTick(new_tick) {
        tick = new_tick
    }

    getTick() {
        return tick
    }

    setRuntimeEntityID(new_runtime_entity_id) {
        runtime_entity_id = new_runtime_entity_id 
    }

    getRuntimeEntityID() {
        return runtime_entity_id;
    }

    writePacket(client) {
        client.queue(this.getPacketName(), {
            "runtime_entity_id": this.getRuntimeEntityID(),
            "metadata": [
                {
                    "key": "flags",
                    "type": "long",
                    "value": this.getFieldValue()
                }
            ],
            "properties": this.getProperties(),
            "tick": this.getTick()
        })
    }
}

module.exports = ServerSetEntityDataPacket