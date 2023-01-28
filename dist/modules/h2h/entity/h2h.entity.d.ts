import { PlayerAtp, PlayerWta } from 'src/modules/player/entity/player.entity';
declare class H2h {
    id: number;
    player1Wins: number;
    player2Wins: number;
    player1Id: number;
    player2Id: number;
}
export declare class H2hAtp extends H2h {
    player1: PlayerAtp;
    player2: PlayerAtp;
}
export declare class H2hWta extends H2h {
    player1: PlayerWta;
    player2: PlayerWta;
}
export {};
