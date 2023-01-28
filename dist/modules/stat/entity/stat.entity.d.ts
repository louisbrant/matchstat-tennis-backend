import { PlayerAtp, PlayerWta } from 'src/modules/player/entity/player.entity';
import { TournamentAtp, TournamentWta } from 'src/modules/tournament/entity/tournament.entity';
declare class Stat {
    id: number;
    round: number;
    firstServe1: number;
    firstServeOf1: number;
    aces1: number;
    doubleFaults1: number;
    unforcedErrors1: number;
    winningOnFirstServe1: number;
    winningOnFirstServeOf1: number;
    winningOnSecondServe1: number;
    winningOnSecondServeOf1: number;
    winners1: number;
    breakPointsConverted1: number;
    breakPointsConvertedOf1: number;
    netApproaches1: number;
    netApproachesOf1: number;
    totalPointsWon1: number;
    fastestServe1: number;
    averageFirstServeSpeed1: number;
    averageSecondServeSpeed1: number;
    firstServe2: number;
    firstServeOf2: number;
    aces2: number;
    doubleFaults2: number;
    unforcedErrors2: number;
    winningOnFirstServe2: number;
    winningOnFirstServeOf2: number;
    winningOnSecondServe2: number;
    winningOnSecondServeOf2: number;
    winners2: number;
    breakPointsConverted2: number;
    breakPointsConvertedOf2: number;
    netApproaches2: number;
    netApproachesOf2: number;
    totalPointsWon2: number;
    fastestServe2: number;
    averageFirstServeSpeed2: number;
    averageSecondServeSpeed2: number;
    rpw1: number;
    rpwOf1: number;
    rpw2: number;
    rpwOf2: number;
    mt: string;
    tournamentId: number;
    player1Id: number;
    player2Id: number;
}
export declare class StatAtp extends Stat {
    player1: PlayerAtp;
    player2: PlayerAtp;
    tournament: TournamentAtp;
}
export declare class StatWta extends Stat {
    player1: PlayerWta;
    player2: PlayerWta;
    tournament: TournamentWta;
}
export {};
