import { UpcomingMatchesService } from "../services/upcomingMatches.service";
import { UpcomingMatchesDto } from "../modules/upcoming-matches/dto/upcoming-matches.dto";
export declare class UpcomingMatchesController {
    private readonly upcomingMatchesService;
    constructor(upcomingMatchesService: UpcomingMatchesService);
    competitionStandings(body: UpcomingMatchesDto): Promise<{
        matches: ({
            tournament: any;
            court: any;
            roundId: any;
            date: any;
            type: import("../modules/shared/middlewares/tour.middleware").TourType;
            player1: {
                name: any;
                odd: any;
                countryAcr: any;
                seed: any;
                image: string;
                id: any;
            };
            player2: {
                name: any;
                odd: any;
                countryAcr: any;
                seed: any;
                image: string;
            };
            h2h: string;
        } | {
            tournament: any;
            court: any;
            roundId: any;
            date: any;
            type: string;
            player1: {
                name: any;
                odd: any;
                countryAcr: any;
                image: string;
                id: any;
            };
            player2: {
                name: any;
                odd: any;
                countryAcr: any;
                image: string;
                id: any;
            };
            h2h: string;
        })[];
    }>;
}
