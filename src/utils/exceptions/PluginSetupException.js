class PluginSetupException extends Error {
	constructor(plugin, message) {
		super("Failed to load " + plugin + ", error: " + message);
		this.name = "PluginSetupException";
	}
}

module.exports = PluginSetupException;
