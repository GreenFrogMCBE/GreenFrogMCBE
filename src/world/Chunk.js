class Chunk {
	/** @type {import("@greenfrog/mc-enums").PossiblyUndefined<number>} */
	x

	/** @type {import("@greenfrog/mc-enums").PossiblyUndefined<number>} */
	z

	/** @type {import("@greenfrog/mc-enums").PossiblyUndefined<import("../../types/world/World").World>} */
	data

	constructor(x, z, data = []) {
		this.x = x
		this.z = z
		this.data = data
	}
}

module.exports = { Chunk }
