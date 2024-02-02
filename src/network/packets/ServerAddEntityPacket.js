/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Packet = require("./Packet")

class ServerAddEntityPacket extends Packet {
	name = "add_entity"

	/** @type {number | undefined} */
	unique_id
	/** @type {number | undefined} */
	runtime_id
	/** @type {string | undefined} */
	entity_type
	/** @type {import("Frog").Vec3 | undefined} */
	position
	/** @type {import("Frog").Vec3 | undefined} */
	velocity
	/** @type {number | undefined} */
	pitch
	/** @type {number | undefined} */
	yaw
	/** @type {number | undefined} */
	head_pitch
	/** @type {number | undefined} */
	head_yaw
	/** @type {number | undefined} */
	body_pitch
	/** @type {number | undefined} */
	body_yaw
	/** @type {import("Frog").EntityAttribute[] | undefined} */
	attributes
	/** @type {import("Frog").EntityMetadata[] | undefined} */
	metadata
	/** @type {import("Frog").EntityDataProperties | undefined} */
	properties
	/** @type {any} */
	links

	/**
     * @param {import("Frog").Player} player
     */
	writePacket(player) {
		player.queue(this.name, {
			unique_id: this.unique_id,
			runtime_id: this.runtime_id,
			entity_type: this.entity_type,
			position: this.position,
			velocity: this.velocity,
			pitch: this.pitch,
			yaw: this.yaw,
			head_yaw: this.head_yaw,
			body_yaw: this.body_yaw,
			attributes: this.attributes,
			metadata: this.metadata,
			properties: this.properties,
			links: this.links
		})
	}
}

module.exports = ServerAddEntityPacket
