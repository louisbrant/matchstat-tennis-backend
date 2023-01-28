import { LiveEventsService } from 'src/services/live-events.service';
export declare class LiveEventsController {
    private readonly liveEventService;
    constructor(liveEventService: LiveEventsService);
    findLiveEvents(type: string): Promise<{
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
