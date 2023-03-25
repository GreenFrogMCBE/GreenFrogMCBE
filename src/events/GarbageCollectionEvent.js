const Event = require("./Event");

class GarbageCollectionEvent extends Event {
	constructor() {
		super();
		this.name = "GarbageCollectionEvent";
		this.server = null;
    }

	async execute() {
        await this._execute()
	}
}

module.exports = GarbageCollectionEvent;