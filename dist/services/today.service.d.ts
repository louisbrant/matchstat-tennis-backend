import { UpdateTodayDto } from 'src/modules/today/dto/update-today.dto';
import { CreateTodayDto } from 'src/modules/today/dto/create-today.dto';
export declare class TodayService {
    create(createTodayDto: CreateTodayDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTodayDto: UpdateTodayDto): string;
    remove(id: number): string;
}
