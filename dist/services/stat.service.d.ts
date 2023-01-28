import { UpdateStatDto } from 'src/modules/stat/dto/update-stat.dto';
import { CreateStatDto } from 'src/modules/stat/dto/create-stat.dto';
export declare class StatService {
    create(createStatDto: CreateStatDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStatDto: UpdateStatDto): string;
    remove(id: number): string;
}
