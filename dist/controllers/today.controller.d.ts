import { UpdateTodayDto } from 'src/modules/today/dto/update-today.dto';
import { TodayService } from 'src/services/today.service';
import { CreateTodayDto } from 'src/modules/today/dto/create-today.dto';
export declare class TodayController {
    private readonly todayService;
    constructor(todayService: TodayService);
    create(createTodayDto: CreateTodayDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTodayDto: UpdateTodayDto): string;
    remove(id: string): string;
}
