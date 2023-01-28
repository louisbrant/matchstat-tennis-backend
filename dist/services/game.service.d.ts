import { CreateGameDto } from 'src/modules/game/dto/create-game.dto';
import { UpdateGameDto } from 'src/modules/game/dto/update-game.dto';
import { GameAtp, GameWta } from 'src/modules/game/entity/game.entity';
import { SharedService } from 'src/services/shared.service';
export declare class GameService {
    private sharedService;
    constructor(sharedService: SharedService);
    create(createGameDto: CreateGameDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateGameDto: UpdateGameDto): string;
    remove(id: number): string;
    mapGameStats(type: string, game: GameAtp | GameWta | any): {
        player1: any;
        player2: any;
    };
    private isEmptyObject;
}
