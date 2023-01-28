import { TournamentService } from 'src/services/tournament.service';
export declare class TournamentController {
    private readonly tournamentService;
    constructor(tournamentService: TournamentService);
    mostVictories(type: string, name: string): Promise<any[] | {
        error: string;
    }>;
    points(type: string, name: string, year: number): Promise<any>;
    draws(type: string, name: string, year: number): Promise<any>;
    pastChampions(type: string, name: string, year: number): Promise<{
        error: string;
        singlesChampions?: undefined;
        doublesChampions?: undefined;
    } | {
        singlesChampions: any;
        doublesChampions: any;
        error?: undefined;
    }>;
    tournamentByYear(type: string, name: string, year: number): Promise<import("../modules/tournament/entity/tournament.entity").TournamentAtp | import("../modules/tournament/entity/tournament.entity").TournamentWta | {
        error: string;
    }>;
    years(type: string, name: string): Promise<any>;
}
