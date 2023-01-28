import { PlayerAtp, PlayerWta } from 'src/modules/player/entity/player.entity';
declare class PlayerStat {
    id: number;
    data: string;
    playerId: number;
}
export declare class PlayerStatAtp extends PlayerStat {
    player: PlayerAtp;
}
export declare class PlayerStatWta extends PlayerStat {
    player: PlayerWta;
}
export {};
