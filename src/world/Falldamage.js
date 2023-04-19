const DamageCause = require("../api/health/DamageCause");
const GameMode = require("../api/player/GameMode");

module.exports = {
    /**
     * Calculates fall damage
     * NOTE: This can be spoofed by hacked client
     * 
     * @param {Client} player
     * @param {JSON} position
     */
    async calculateFalldamage(player, position) {
        if (player.gamemode == GameMode.CREATIVE || player.gamemode == GameMode.SPECTATOR) return;

        let falldamageY = player.y - position.y;

        if (player.on_ground && player.fallDamageQueue && !player.___dmgCd) {
            player.setHealth(player.health - (player.fallDamageQueue * 2), DamageCause.FALL);
            player.fallDamageQueue = 0;
        }


        if (falldamageY < 0.4) {
            return;
        }

        player.fallDamageQueue = (falldamageY + 0.5) * 2;
    },

    /**
     * This function calculates how much hunger the player must lose
     * 
     * @param {Client} player
     * @param {JSON} position
     */
    async calculateHungerloss(player, position) {
        if (player.gamemode == GameMode.CREATIVE || player.gamemode == GameMode.SPECTATOR) return;

        if (position == !undefined && position.y == !player.y) return

        if (Math.floor(Math.random() * 50) === 50) {
            // TODO: Vanilla behaviour
            player.setHunger(player.hunger - 1);
        }
    }
}