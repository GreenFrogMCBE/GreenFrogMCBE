declare let playersOnline: Object[];

export interface OnlinePlayers {
    addPlayer(player: Object): void;
    get(player: Object): Object | null;

    players: any[];
}

declare const OnlinePlayers: OnlinePlayers;

export default OnlinePlayers;