import { Round } from "../../round/entity/round.entity";
import { PlayerWta } from "../../player/entity/player.entity";
import { TournamentWta } from "../../tournament/entity/tournament.entity";
export declare class DrawOrderWta {
    id: number;
    draw: number;
    date: Date;
    round: Round;
    roundId: number;
    player1: PlayerWta;
    player1Id: number;
    player2: PlayerWta;
    player2Id: number;
    tournament: TournamentWta;
    tournamentId: number;
}
