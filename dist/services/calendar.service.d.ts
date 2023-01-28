import { Connection, Repository } from 'typeorm';
import { TournamentAtp, TournamentWta } from 'src/modules/tournament/entity/tournament.entity';
import { Rank } from 'src/modules/rank/entity/rank.entity';
import { GameService } from 'src/services/game.service';
import { SharedService } from 'src/services/shared.service';
import { CalendarFilterDto } from 'src/modules/calendar/dto/calendar-filter.dto';
import { Court } from 'src/modules/court/entity/court.entity';
export declare class CalendarService {
    private tournamentAtpRepository;
    private tournamentWtaRepository;
    private courtRepository;
    private rankRepository;
    private connection;
    private gameService;
    private sharedService;
    constructor(tournamentAtpRepository: Repository<TournamentAtp>, tournamentWtaRepository: Repository<TournamentWta>, courtRepository: Repository<Court>, rankRepository: Repository<Rank>, connection: Connection, gameService: GameService, sharedService: SharedService);
    findAll(type: string, year: number, queryParams: CalendarFilterDto): Promise<any> | {
        error: string;
    };
    findFilters(type: string): Promise<{
        error: string;
        years?: undefined;
        levels?: undefined;
        surfaces?: undefined;
    } | {
        years: any;
        levels: Rank[];
        surfaces: Court[];
        error?: undefined;
    }>;
}
