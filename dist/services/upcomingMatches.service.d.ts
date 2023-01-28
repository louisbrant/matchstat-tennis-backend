import { TodayAtp, TodayWta } from 'src/modules/today/entity/today.entity';
import { Repository } from "typeorm";
import { SharedService } from "./shared.service";
import { H2hAtp, H2hWta } from "../modules/h2h/entity/h2h.entity";
import { TourType } from "../modules/shared/middlewares/tour.middleware";
export declare class UpcomingMatchesService {
    private sharedService;
    private todayAtpRepository;
    private todayWtaRepository;
    private h2hAtpRepository;
    private h2hWtaRepository;
    constructor(sharedService: SharedService, todayAtpRepository: Repository<TodayAtp>, todayWtaRepository: Repository<TodayWta>, h2hAtpRepository: Repository<H2hAtp>, h2hWtaRepository: Repository<H2hWta>);
    upcomingMatches({ date, limit }: {
        date: any;
        limit: any;
    }): Promise<{
        matches: ({
            tournament: any;
            court: any;
            roundId: any;
            date: any;
            type: TourType;
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
