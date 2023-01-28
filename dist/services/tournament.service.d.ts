import { Connection, Repository } from 'typeorm';
import { PlayerAtp, PlayerWta } from 'src/modules/player/entity/player.entity';
import { GameAtp, GameWta } from 'src/modules/game/entity/game.entity';
import { SharedService } from 'src/services/shared.service';
import { TournamentAtp, TournamentWta } from 'src/modules/tournament/entity/tournament.entity';
import { PointPrize } from 'src/modules/points/entity/prize.entity';
import { TodayAtp, TodayWta } from 'src/modules/today/entity/today.entity';
import { H2hAtp, H2hWta } from 'src/modules/h2h/entity/h2h.entity';
export declare class TournamentService {
    private tournamentAtpRepository;
    private tournamentWtaRepository;
    private gameAtpRepository;
    private gameWtaRepository;
    private playerAtpRepository;
    private playerWtaRepository;
    private todayAtpRepository;
    private todayWtaRepository;
    private h2hAtpRepository;
    private h2hWtaRepository;
    private pointRepository;
    private sharedService;
    private connection;
    constructor(tournamentAtpRepository: Repository<TournamentAtp>, tournamentWtaRepository: Repository<TournamentWta>, gameAtpRepository: Repository<GameAtp>, gameWtaRepository: Repository<GameWta>, playerAtpRepository: Repository<PlayerAtp>, playerWtaRepository: Repository<PlayerWta>, todayAtpRepository: Repository<TodayAtp>, todayWtaRepository: Repository<TodayWta>, h2hAtpRepository: Repository<H2hAtp>, h2hWtaRepository: Repository<H2hWta>, pointRepository: Repository<PointPrize>, sharedService: SharedService, connection: Connection);
    tournamentByYear(type: string, name: string, year: number): Promise<TournamentAtp | TournamentWta | {
        error: string;
    }>;
    years(type: string, name: string): Promise<any>;
    points(type: string, name: string, year: number): Promise<any>;
    mostVictories(type: string, name: string): Promise<any[] | {
        error: string;
    }>;
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
    private mapGameStats;
    private getTournamentIds;
    private getTournament;
    private getParentTournamentIds;
    private getChildrenTournamentIds;
}
