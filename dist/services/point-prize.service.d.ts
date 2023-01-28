import { UpdatePointDto } from 'src/modules/points/dto/update-point.dto';
import { CreatePointDto } from 'src/modules/points/dto/create-point.dto';
export declare class PointPrizeService {
    create(createPointDto: CreatePointDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePointDto: UpdatePointDto): string;
    remove(id: number): string;
}
