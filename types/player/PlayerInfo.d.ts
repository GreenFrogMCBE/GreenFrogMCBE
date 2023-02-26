declare let playersOnline: Object[];

export interface OnlinePlayers {
    /**
     * Adds player
     * @param player
    */
    addPlayer(player: Object): void;
    
    /**
     * @param {Object} player
     * @returns The player if the player is online, null otherwise.
    */
    get(player: Object): Object | null;
    
    /**
     * @returns The players array.
    */
    players: Object[];
}
declare const OnlinePlayers: OnlinePlayers;

export default OnlinePlayers;