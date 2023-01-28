import { Repository } from 'typeorm';
import { TodayAtp, TodayWta } from 'src/modules/today/entity/today.entity';
import { SharedService } from 'src/services/shared.service';
export declare class LiveEventsService {
    private todayAtpRepository;
    private todayWtaRepository;
    private sharedService;
    constructor(todayAtpRepository: Repository<TodayAtp>, todayWtaRepository: Repository<TodayWta>, sharedService: SharedService);
    liveEvents(type: string): Promise<{
        name: string;
        country: string;
        image: string;
        date: Date;
        prize: string;
        courtId: number;
        courtName: string;
    }[]> | {
        error: string;
    };
}
