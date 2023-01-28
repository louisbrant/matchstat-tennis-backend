import { Repository } from 'typeorm';
import { RatingAtp, RatingWta } from 'src/modules/ratings/entity/rating.entity';
import { Country } from 'src/modules/country/entity/country.entity';
import { PlayerAtp, PlayerWta } from 'src/modules/player/entity/player.entity';
import { SharedService } from 'src/services/shared.service';
import { RankingDto } from 'src/modules/rankings/dto/ranking.dto';
import { Court } from 'src/modules/court/entity/court.entity';
export declare class RankingsService {
    private ratingAtpRepository;
    private ratingWtaRepository;
    private playerAtpRepository;
    private playerWtaRepository;
    private countryRepository;
    private courtRepository;
    private sharedService;
    constructor(ratingAtpRepository: Repository<RatingAtp>, ratingWtaRepository: Repository<RatingWta>, playerAtpRepository: Repository<PlayerAtp>, playerWtaRepository: Repository<PlayerWta>, countryRepository: Repository<Country>, courtRepository: Repository<Court>, sharedService: SharedService);
    rankingTop10(type: string): Promise<RatingAtp[]> | {
        error: string;
    };
    ranking(type: string, queryParams: RankingDto): any[] | Promise<any> | {
        error: string;
    };
    rankingFilters(type: string): Promise<{
        countries: Country[];
        surfaces: Court[];
        date: Date[];
    } | {
        error: string;
    }>;
    private singlesRanking;
    private getRankingByDate;
    private doublesRanking;
    private raceRanking;
    private prizeRanking;
    private roundIdToName;
}
