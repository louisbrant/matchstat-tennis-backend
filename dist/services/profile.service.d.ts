import { Repository } from 'typeorm';
import { PlayerAtp, PlayerWta } from 'src/modules/player/entity/player.entity';
import { SharedService } from 'src/services/shared.service';
import { GameAtp, GameWta } from 'src/modules/game/entity/game.entity';
import { RatingAtp, RatingWta } from 'src/modules/ratings/entity/rating.entity';
import { PlayerStatAtp, PlayerStatWta } from 'src/modules/player-stats/entity/player-stat.entity';
import { H2hAtp, H2hWta } from 'src/modules/h2h/entity/h2h.entity';
import { TodayAtp, TodayWta } from 'src/modules/today/entity/today.entity';
import { GameService } from 'src/services/game.service';
import { Round } from 'src/modules/round/entity/round.entity';
import { StatAtp, StatWta } from 'src/modules/stat/entity/stat.entity';
import { Rank } from 'src/modules/rank/entity/rank.entity';
import { MatchPlayedGameDto } from 'src/modules/game/dto/match-played-game.dto';
import { MatchStatPlayerDto } from 'src/modules/player/dto/match-stat-player.dto';
import { Court } from 'src/modules/court/entity/court.entity';
export declare class ProfileService {
    private playerAtpRepository;
    private playerWtaRepository;
    private playerStatAtpRepository;
    private playerStatWtaRepository;
    private gameAtpRepository;
    private gameWtaRepository;
    private ratingAtpRepository;
    private ratingWtaRepository;
    private h2hAtpRepository;
    private h2hWtaRepository;
    private todayAtpRepository;
    private todayWtaRepository;
    private statAtpRepository;
    private statWtaRepository;
    private courtRepository;
    private roundRepository;
    private rankRepository;
    private sharedService;
    private gameService;
    constructor(playerAtpRepository: Repository<PlayerAtp>, playerWtaRepository: Repository<PlayerWta>, playerStatAtpRepository: Repository<PlayerStatAtp>, playerStatWtaRepository: Repository<PlayerStatWta>, gameAtpRepository: Repository<GameAtp>, gameWtaRepository: Repository<GameWta>, ratingAtpRepository: Repository<RatingAtp>, ratingWtaRepository: Repository<RatingWta>, h2hAtpRepository: Repository<H2hAtp>, h2hWtaRepository: Repository<H2hWta>, todayAtpRepository: Repository<TodayAtp>, todayWtaRepository: Repository<TodayWta>, statAtpRepository: Repository<StatAtp>, statWtaRepository: Repository<StatWta>, courtRepository: Repository<Court>, roundRepository: Repository<Round>, rankRepository: Repository<Rank>, sharedService: SharedService, gameService: GameService);
    information(name: string): Promise<any>;
    statistics(name: string): Promise<{
        err: string;
    } | {
        totalTitles: number;
        mainTours: string;
        tourFinals: string;
        master: string;
        grandSlam: string;
        cups: string;
        futures: string;
        challengers: string;
        total: string;
        favouriteCourt: {
            surface: string;
            length: number;
            toString(): string;
            toLocaleString(): string;
            pop(): any;
            push(...items: any[]): number;
            concat(...items: ConcatArray<any>[]): any[];
            concat(...items: any[]): any[];
            join(separator?: string): string;
            reverse(): any[];
            shift(): any;
            slice(start?: number, end?: number): any[];
            sort(compareFn?: (a: any, b: any) => number): any[];
            splice(start: number, deleteCount?: number): any[];
            splice(start: number, deleteCount: number, ...items: any[]): any[];
            unshift(...items: any[]): number;
            indexOf(searchElement: any, fromIndex?: number): number;
            lastIndexOf(searchElement: any, fromIndex?: number): number;
            every<S extends any>(predicate: (value: any, index: number, array: any[]) => value is S, thisArg?: any): this is S[];
            every(predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any): boolean;
            some(predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any): boolean;
            forEach(callbackfn: (value: any, index: number, array: any[]) => void, thisArg?: any): void;
            map<U>(callbackfn: (value: any, index: number, array: any[]) => U, thisArg?: any): U[];
            filter<S_1 extends any>(predicate: (value: any, index: number, array: any[]) => value is S_1, thisArg?: any): S_1[];
            filter(predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any): any[];
            reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any): any;
            reduce(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any;
            reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: any, currentIndex: number, array: any[]) => U_1, initialValue: U_1): U_1;
            reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any): any;
            reduceRight(callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any;
            reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: any, currentIndex: number, array: any[]) => U_2, initialValue: U_2): U_2;
            find<S_2 extends any>(predicate: (this: void, value: any, index: number, obj: any[]) => value is S_2, thisArg?: any): S_2;
            find(predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any): any;
            findIndex(predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any): number;
            fill(value: any, start?: number, end?: number): any[];
            copyWithin(target: number, start: number, end?: number): any[];
            entries(): IterableIterator<[number, any]>;
            keys(): IterableIterator<number>;
            values(): IterableIterator<any>;
            includes(searchElement: any, fromIndex?: number): boolean;
            flatMap<U_3, This = undefined>(callback: (this: This, value: any, index: number, array: any[]) => U_3 | readonly U_3[], thisArg?: This): U_3[];
            flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
            [Symbol.iterator](): IterableIterator<any>;
            [Symbol.unscopables](): {
                copyWithin: boolean;
                entries: boolean;
                fill: boolean;
                find: boolean;
                findIndex: boolean;
                keys: boolean;
                values: boolean;
            };
            at(index: number): any;
        };
        recentGames: ("w" | "l")[];
        currentRank: number;
        bestRank: {
            position: number;
            date: Date;
        };
        err?: undefined;
    }>;
    interestingH2h(name: string): Promise<{
        h2h: string;
        opponent: string;
    }[]>;
    upcomingMatches(name: string): Promise<{
        tournament: any;
        roundId: any;
        player1: {
            name: any;
            seed: any;
            odd: any;
            countryAcr: any;
            image: string;
        };
        player2: {
            name: any;
            seed: any;
            odd: any;
            countryAcr: any;
            image: string;
        };
        h2h: string;
    }[]>;
    breakdown(name: string): Promise<any[]>;
    surfaceSummary(name: string): Promise<any[]>;
    matchesPlayed(name: string, query: MatchPlayedGameDto): Promise<{
        singles: any[];
        doubles: any[];
        qualifying: any[];
        singlesCount: number;
    }>;
    profileFilters(name: string): Promise<{
        courts: Court[];
        rounds: Round[];
        level: Rank[];
        years: any[];
    }>;
    getRounds(): Promise<Round[]>;
    finals(name: string, year: number): Promise<{
        titles: any;
        finals: any;
    }>;
    matchStats(name: string, year: number | string, params: MatchStatPlayerDto): Promise<{
        games: any;
        playerWins: number;
        opponentWins: number;
        serviceStats: {
            acesGm: {
                value: any;
                count: number;
            };
            doubleFaultsGm: {
                value: any;
                count: number;
            };
            firstServe: {
                value: any;
                count: any;
            };
            winningOnFirstServe: {
                value: any;
                count: any;
            };
            winningOnSecondServe: {
                value: any;
                count: any;
            };
            srwPtsWin: {
                value: any;
                count: any;
            };
        };
        returnStats: {
            opponentAcesGm: {
                value: any;
                count: number;
            };
            opponentDoubleFaultsGm: {
                value: any;
                count: number;
            };
            opponentFirstServe: {
                value: any;
                count: any;
            };
            opponentWinningOnFirstServe: {
                value: number;
                count: any;
            };
            opponentWinningOnSecondServe: {
                value: number;
                count: any;
            };
            opponentSrwPtsWin: {
                value: number;
                count: any;
            };
        };
        breakPointsServe: {
            breakPointSavedGm: {
                value: number;
                count: number;
            };
            breakPointFacedGm: {
                value: any;
                count: number;
            };
            breakPointSave: {
                value: number;
                count: any;
            };
            serviceHold: {
                value: number;
                count: number;
            };
        };
        breakPointsRtn: {
            breakPointWonGm: {
                value: any;
                count: number;
            };
            breakPointChanceGm: {
                value: any;
                count: number;
            };
            breakPointWon: {
                value: any;
                count: any;
            };
            opponentHold: {
                value: number;
                count: number;
            };
        };
    }>;
    searchProfiles(searchString: string, type: string): Promise<string[]>;
    private sumStatWinner;
    private sumStatLoser;
    private getPlayerByName;
    private getPlayerStat;
    private getPlayer;
    private recentGame;
    private bestRank;
    private getYtdTitles;
}
