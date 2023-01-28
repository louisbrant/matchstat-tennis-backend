import { TourType } from 'src/modules/shared/middlewares/tour.middleware';
import { RankingsService } from 'src/services/rankings.service';
import { RankingDto } from 'src/modules/rankings/dto/ranking.dto';
export declare class RankingsController {
    private readonly rankingService;
    constructor(rankingService: RankingsService);
    findTop10Ranking(type: TourType): Promise<import("../modules/ratings/entity/rating.entity").RatingAtp[]> | {
        error: string;
    };
    findRanking(type: TourType, queryParams: RankingDto): any[] | Promise<any> | {
        error: string;
    };
    findRankingFilters(type: TourType): Promise<{
        countries: import("../modules/country/entity/country.entity").Country[];
        surfaces: import("../modules/court/entity/court.entity").Court[];
        date: Date[];
    } | {
        error: string;
    }>;
}
