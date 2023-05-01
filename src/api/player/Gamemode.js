module.exports = /** @type {const} */ ({
	CREATIVE: "creative",
	SURVIVAL: "survival",
	/** 1.19.30+ */
	SPECTATOR: "spectator",

	/** @deprecated */
	CREATIVESPECTATOR: this.SPECTATOR,
	/** @deprecated */
	SURVIVALSPECTATOR: this.SPECTATOR,

	ADVENTURE: "adventure",

	/** Fallbacks to the world gamemode */
	FALLBACK: "fallback",
});
