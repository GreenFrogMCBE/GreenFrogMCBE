const DisplaySlots = require("./types/DisplaySlots");
const PacketConstructor = require("./PacketConstructor");

let displaySlot = DisplaySlots.SIDEBAR;
let objectiveName = 's' + (Math.random() + 1).toString(36).substring(7);
let displayName = null;
let criteriaName = null;
let sortOrder = 0;

class ServerScoreboardObjectivePacket extends PacketConstructor {
    /**
     * Returns the packet name.
     * @returns {String} The name of the packet.
     */
    getPacketName() {
        return "set_display_objective";
    }

    /**
     * Returns if is the packet critical.
     * @returns {Boolean} Returns if the packet is critical.
     */
    isCriticalPacket() {
        return false;
    }

    /**
     * Sets the display slot.
     * @param {DisplaySlots} slot The display slot to set.
     */
    setDisplaySlot(slot) {
        displaySlot = slot;
    }

    /**
     * Sets the objective name.
     * @param {String} name The objective name to set.
     */
    setObjectiveName(name) {
        objectiveName = name;
    }

    /**
     * Sets the display name.
     * @param {String} name The display name to set.
     */
    setDisplayName(name) {
        displayName = name;
    }

    /**
     * Sets the criteria name.
     * @param {String} name The criteria name to set.
     */
    setCriteriaName(name) {
        criteriaName = name;
    }

    /**
     * Sets the sort order.
     * @param {Number} order The sort order to set.
     */
    setSortOrder(order) {
        sortOrder = order;
    }

    /**
     * Returns the display slot.
     * @returns {DisplaySlots} The display slot.
     */
    getDisplaySlot() {
        return displaySlot;
    }

    /**
     * Returns the objective name.
     * @returns {String} The objective name.
     */
    getObjectiveName() {
        return objectiveName;
    }

    /**
     * Returns the display name.
     * @returns {String} The display name.
     */
    getDisplayName() {
        return displayName;
    }

    /**
     * Returns the criteria name.
     * @returns {String} The criteria name.
     */
    getCriteriaName() {
        return criteriaName;
    }

    /**
     * Returns the sort order.
     * @returns {Number} The sort order.
     */
    getSortOrder() {
        return sortOrder;
    }

    /**
     * Sends the packet to the client.
     * @param {any} client
     */
    writePacket(client) {
        client.queue(this.getPacketName(), {
            display_slot: this.getDisplaySlot(),
            objective_name: this.getObjectiveName(),
            display_name: this.getDisplayName(),
            criteria_name: this.getCriteriaName(),
            sort_order: this.getSortOrder(),
        });
    }
}

module.exports = ServerScoreboardObjectivePacket;