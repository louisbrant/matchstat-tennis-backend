import { UpdatePlayerStatDto } from 'src/modules/player-stats/dto/update-player-stat.dto';
import { CreatePlayerStatDto } from 'src/modules/player-stats/dto/create-player-stat.dto';
export declare class PlayerStatsService {
    create(createPlayerStatDto: CreatePlayerStatDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePlayerStatDto: UpdatePlayerStatDto): string;
    remove(id: number): string;
}
