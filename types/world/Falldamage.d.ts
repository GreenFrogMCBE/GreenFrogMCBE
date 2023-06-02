/**
 * Calculates fall damage
 * NOTE: This can be spoofed by a hacked client
 *
 * @param {Client} player
 * @param {JSON} position
 */
export function calculateFalldamage(player: Client, position: JSON): Promise<void>;
/**
 * This function calculates how much hunger the player must lose
 *
 * @param {Client} player
 * @param {JSON} position
 */
export function calculateHungerloss(player: Client, position: JSON): Promise<void>;
