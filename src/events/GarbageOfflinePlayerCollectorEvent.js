const Event = require("./Event");

class GarbageOfflinePlayerCollectorEvent extends Event {
	constructor() {
		super();
		this.name = "GarbageOfflinePlayerCollectorEvent";
		this.server = null;
    }

	async execute() {
        await this._execute()
	}
}

module.exports = GarbageOfflinePlayerCollectorEvent;