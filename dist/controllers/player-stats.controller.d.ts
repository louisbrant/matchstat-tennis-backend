import { PlayerStatsService } from 'src/services/player-stats.service';
import { UpdatePlayerStatDto } from 'src/modules/player-stats/dto/update-player-stat.dto';
import { CreatePlayerStatDto } from 'src/modules/player-stats/dto/create-player-stat.dto';
export declare class PlayerStatsController {
    private readonly playerStatsService;
    constructor(playerStatsService: PlayerStatsService);
    create(createPlayerStatDto: CreatePlayerStatDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePlayerStatDto: UpdatePlayerStatDto): string;
    remove(id: string): string;
}
