import { Round } from "../../round/entity/round.entity";
import { PlayerAtp } from "../../player/entity/player.entity";
import { TournamentAtp } from "../../tournament/entity/tournament.entity";
export declare class DrawOrderAtp {
    id: number;
    draw: number;
    date: Date;
    round: Round;
    roundId: number;
    player1: PlayerAtp;
    player1Id: number;
    player2: PlayerAtp;
    player2Id: number;
    tournament: TournamentAtp;
    tournamentId: number;
}
