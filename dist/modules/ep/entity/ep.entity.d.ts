import { PlayerAtp, PlayerWta } from 'src/modules/player/entity/player.entity';
declare class Ep {
    id: number;
    turnedPro: string;
    weight: string;
    height: string;
    birthplace: string;
    residence: string;
    plays: string;
    coach: string;
    site: string;
    twitter: string;
    page: string;
    instagram: string;
    facebook: string;
    last_revised: string;
    playerStatus: string;
}
export declare class EpAtp extends Ep {
    player: PlayerAtp;
}
export declare class EpWta extends Ep {
    player: PlayerWta;
}
export {};
