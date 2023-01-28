import { PlayerAtp, PlayerWta } from 'src/modules/player/entity/player.entity';
declare class Rating {
    id: number;
    date: Date;
    point: number;
    position: number;
}
export declare class RatingAtp extends Rating {
    player: PlayerAtp;
}
export declare class RatingWta extends Rating {
    player: PlayerWta;
}
export {};
