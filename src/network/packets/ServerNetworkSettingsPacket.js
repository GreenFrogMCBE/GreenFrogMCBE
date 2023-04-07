const PacketConstructor = require("./PacketConstructor");

let compressionThreshold = 0;

class ServerNetworkSettingsPacket extends PacketConstructor {
    /**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "network_settings";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return true;
	}

    /**
     * Returns the compression threshold
     * 
     * @returns {number}
     */
    getCompressionThreshold() {
        return compressionThreshold;
    }

    /**
     * Sets the compression threshold
     * 
     * @param {number} compression_threshold 
     */
    setCompressionThreshold(compression_threshold) {
        compressionThreshold = compression_threshold
    }

    writePacket(client) {
        client.queue(this.getPacketName(), { compressionThreshold })
    }
}

module.exports = ServerNetworkSettingsPacket;