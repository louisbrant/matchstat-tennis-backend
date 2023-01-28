import { PointPrizeService } from 'src/services/point-prize.service';
import { UpdatePointDto } from 'src/modules/points/dto/update-point.dto';
import { CreatePointDto } from 'src/modules/points/dto/create-point.dto';
export declare class PointPrizeController {
    private readonly pointsService;
    constructor(pointsService: PointPrizeService);
    create(createPointDto: CreatePointDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePointDto: UpdatePointDto): string;
    remove(id: string): string;
}
