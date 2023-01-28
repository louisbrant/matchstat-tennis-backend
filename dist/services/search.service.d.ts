import { Repository } from 'typeorm';
import { PlayerAtp, PlayerWta } from 'src/modules/player/entity/player.entity';
import { SharedService } from 'src/services/shared.service';
import { TournamentAtp, TournamentWta } from 'src/modules/tournament/entity/tournament.entity';
export declare class SearchService {
    private playerAtpRepository;
    private playerWtaRepository;
    private tournamentAtpRepository;
    private tournamentWtaRepository;
    private sharedService;
    constructor(playerAtpRepository: Repository<PlayerAtp>, playerWtaRepository: Repository<PlayerWta>, tournamentAtpRepository: Repository<TournamentAtp>, tournamentWtaRepository: Repository<TournamentWta>, sharedService: SharedService);
    categories: string[];
    elasticSearch(search: string): Promise<any[]>;
    searchByCategory(search: string, category: string): Promise<any>;
    private searchPlayer;
    private searchTournament;
}
