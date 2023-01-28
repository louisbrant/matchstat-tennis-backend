import { UpdateEpDto } from 'src/modules/ep/dto/update-ep.dto';
import { CreateEpDto } from 'src/modules/ep/dto/create-ep.dto';
export declare class EpService {
    create(createEpDto: CreateEpDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEpDto: UpdateEpDto): string;
    remove(id: number): string;
}
