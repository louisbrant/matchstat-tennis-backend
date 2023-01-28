import { ProfileService } from 'src/services/profile.service';
import { MatchPlayedGameDto } from 'src/modules/game/dto/match-played-game.dto';
import { MatchStatPlayerDto } from 'src/modules/player/dto/match-stat-player.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    findProfile(name: string): Promise<any>;
    findStatistics(name: string): Promise<{
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
    findInterestingH2h(name: string): Promise<{
        h2h: string;
        opponent: string;
    }[]>;
    findUpcomingMatches(name: string): Promise<{
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
    findBreakdown(name: string): Promise<any[]>;
    findSurfaceSummary(name: string): Promise<any[]>;
    findMatchesPlayed(name: string, queryParams: MatchPlayedGameDto): Promise<{
        singles: any[];
        doubles: any[];
        qualifying: any[];
        singlesCount: number;
    }>;
    findProfileFilters(name: string): Promise<{
        courts: import("../modules/court/entity/court.entity").Court[];
        rounds: import("../modules/round/entity/round.entity").Round[];
        level: import("../modules/rank/entity/rank.entity").Rank[];
        years: any[];
    }>;
    findFinals(name: string, year: number): Promise<{
        titles: any;
        finals: any;
    }>;
    findMatchStats(name: string, year: number | string, queryParams: MatchStatPlayerDto): Promise<{
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
    findSearchProfiles(name: string, type: string): Promise<string[]>;
}
