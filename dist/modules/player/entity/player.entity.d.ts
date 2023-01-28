import { GameAtp, GameWta } from 'src/modules/game/entity/game.entity';
import { StatAtp, StatWta } from 'src/modules/stat/entity/stat.entity';
import { EpAtp, EpWta } from 'src/modules/ep/entity/ep.entity';
import { Country } from 'src/modules/country/entity/country.entity';
import { RatingAtp, RatingWta } from 'src/modules/ratings/entity/rating.entity';
declare class Player {
    id: number;
    name: string;
    birthday: Date;
    country: Country;
    countryAcr: string;
    currentRank: number;
    progress: number;
    points: number;
    hardPoints: number;
    hardTournament: number;
    clayPoints: number;
    clayTournament: number;
    grassPoints: number;
    grassTournament: number;
    carpetPoints: number;
    carterTournament: number;
    prize: number;
    ch: number;
    doublesPosition: number;
    doublesProgress: number;
    doublesPoints: number;
    ihardPoints: number;
    ihardTournament: number;
    itf: number;
}
export declare class PlayerAtp extends Player {
    rating: RatingAtp[];
    gamesWinner: GameAtp[];
    gamesLoser: GameAtp[];
    games: GameAtp[];
    statsWinner: StatAtp[];
    statsLoser: StatAtp[];
    information: EpAtp[];
}
export declare class PlayerWta extends Player {
    rating: RatingWta[];
    gamesWinner: GameWta[];
    gamesLoser: GameWta[];
    games: GameWta[];
    statsWinner: StatWta[];
    statsLoser: StatWta[];
    information: EpWta[];
}
export {};
