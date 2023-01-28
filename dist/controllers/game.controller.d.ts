import { GameService } from 'src/services/game.service';
import { CreateGameDto } from 'src/modules/game/dto/create-game.dto';
import { UpdateGameDto } from 'src/modules/game/dto/update-game.dto';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    create(createGameDto: CreateGameDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateGameDto: UpdateGameDto): string;
    remove(id: string): string;
}
