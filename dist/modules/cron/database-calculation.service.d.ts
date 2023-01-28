import { Connection, Repository } from 'typeorm';
import { H2hAtp, H2hWta } from 'src/modules/h2h/entity/h2h.entity';
import { PlayerStatAtp, PlayerStatWta } from 'src/modules/player-stats/entity/player-stat.entity';
export declare class DatabaseCalculationService {
    private h2hAtpRepository;
    private h2hWtaRepository;
    private playerStatAtpRepository;
    private playerStatWtaRepository;
    private connection;
    constructor(h2hAtpRepository: Repository<H2hAtp>, h2hWtaRepository: Repository<H2hWta>, playerStatAtpRepository: Repository<PlayerStatAtp>, playerStatWtaRepository: Repository<PlayerStatWta>, connection: Connection);
    private selectGames;
    calculate(type: 'atp' | 'wta'): Promise<void>;
    private getRank;
    private getLevel;
    private getLevelFinals;
}
