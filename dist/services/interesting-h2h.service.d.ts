import { Repository } from 'typeorm';
import { H2hAtp, H2hWta } from 'src/modules/h2h/entity/h2h.entity';
export declare class InterestingH2hService {
    private h2hAtpRepository;
    private h2hWtaRepository;
    constructor(h2hAtpRepository: Repository<H2hAtp>, h2hWtaRepository: Repository<H2hWta>);
    interestingH2h(type: string): Promise<H2hAtp[]> | {
        error: string;
    };
}
