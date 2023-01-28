import { PbpStatService } from 'src/services/pbp-stat.service';
export declare class PbpStatController {
    private readonly pbpStatService;
    constructor(pbpStatService: PbpStatService);
    getStat(req: any): Promise<{
        data: any;
    }>;
}
