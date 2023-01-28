import { UpdateEpDto } from 'src/modules/ep/dto/update-ep.dto';
import { CreateEpDto } from 'src/modules/ep/dto/create-ep.dto';
import { EpService } from 'src/services/ep.service';
export declare class EpController {
    private readonly epService;
    constructor(epService: EpService);
    create(createEpDto: CreateEpDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEpDto: UpdateEpDto): string;
    remove(id: string): string;
}
