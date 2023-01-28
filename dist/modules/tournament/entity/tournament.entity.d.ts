import { GameAtp, GameWta } from 'src/modules/game/entity/game.entity';
import { Country } from 'src/modules/country/entity/country.entity';
import { Rank } from 'src/modules/rank/entity/rank.entity';
import { PointPrize } from 'src/modules/points/entity/prize.entity';
import { Court } from 'src/modules/court/entity/court.entity';
declare class Tournament {
    id: number;
    name: string;
    court: Court;
    courtId: number;
    date: Date;
    rank: Rank;
    rankId: number;
    link: number;
    country: Country;
    countryAcr: string;
    prize: string;
    rating: PointPrize;
    ratingId: number;
    url: string;
    latitude: number;
    longitude: number;
    site: string;
    race: number;
    entry: number;
    singlesPrize: PointPrize;
    singlesPrizeId: number;
    doublesMoney: PointPrize;
    doublesMoneyId: number;
    tier: string;
    reserveInt: number;
    reserveChar: string;
    live: string;
    result: string;
}
export declare class TournamentAtp extends Tournament {
    games: GameAtp[];
}
export declare class TournamentWta extends Tournament {
    games: GameWta[];
}
export {};
