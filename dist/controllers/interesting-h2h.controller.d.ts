import { InterestingH2hService } from 'src/services/interesting-h2h.service';
export declare class InterestingH2hController {
    private readonly interestingH2hService;
    constructor(interestingH2hService: InterestingH2hService);
    findInterestingH2h(type: string): Promise<import("../modules/h2h/entity/h2h.entity").H2hAtp[]> | {
        error: string;
    };
}
