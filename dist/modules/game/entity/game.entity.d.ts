import { PlayerAtp, PlayerWta } from 'src/modules/player/entity/player.entity';
import { TournamentAtp, TournamentWta } from 'src/modules/tournament/entity/tournament.entity';
import { Round } from 'src/modules/round/entity/round.entity';
declare class Game {
    id: number;
    round: Round;
    roundId: number;
    result: string;
    date: Date;
    seed1: string;
    seed2: string;
    odd1: string;
    odd2: string;
    player1Id: number;
    player2Id: number;
    tournamentId: number;
    draw: number;
}
export declare class GameAtp extends Game {
    tournament: TournamentAtp;
    player1: PlayerAtp;
    player2: PlayerAtp;
    players: PlayerAtp;
}
export declare class GameWta extends Game {
    tournament: TournamentWta;
    player1: PlayerWta;
    player2: PlayerWta;
    players: PlayerWta;
}
export {};
