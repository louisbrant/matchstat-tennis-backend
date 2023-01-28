import { UpdateStatDto } from 'src/modules/stat/dto/update-stat.dto';
import { StatService } from 'src/services/stat.service';
import { CreateStatDto } from 'src/modules/stat/dto/create-stat.dto';
export declare class StatController {
    private readonly statService;
    constructor(statService: StatService);
    create(createStatDto: CreateStatDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateStatDto: UpdateStatDto): string;
    remove(id: string): string;
}
