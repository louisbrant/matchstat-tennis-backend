export declare class SharedService {
    getPlayerImage(type: string, id: number): string;
    getTournamentImage(type: string, id: number): string;
    getRoundById(roundId: number): void;
    private rounds;
}
