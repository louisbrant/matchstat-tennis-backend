import { PlayerAtp, PlayerWta } from 'src/modules/player/entity/player.entity';
import { TournamentAtp, TournamentWta } from 'src/modules/tournament/entity/tournament.entity';
import { Round } from 'src/modules/round/entity/round.entity';
declare class Today {
    id: number;
    date: Date;
    round: Round;
    roundId: number;
    draw: number;
    result: string;
    complete: number;
    live: string;
    timeGame: Date;
    reserveInt: number;
    reserveString: string;
    odd1: string;
    odd2: string;
    seed1: string;
    seed2: string;
    player1Id: number;
    player2Id: number;
    tournamentId: number;
}
export declare class TodayAtp extends Today {
    player1: PlayerAtp;
    player2: PlayerAtp;
    tournament: TournamentAtp;
}
export declare class TodayWta extends Today {
    player1: PlayerWta;
    player2: PlayerWta;
    tournament: TournamentWta;
}
export {};
