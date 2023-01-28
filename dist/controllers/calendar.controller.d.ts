import { CalendarService } from 'src/services/calendar.service';
import { CalendarFilterDto } from 'src/modules/calendar/dto/calendar-filter.dto';
export declare class CalendarController {
    private readonly calendarService;
    constructor(calendarService: CalendarService);
    findFilters(type: string): Promise<{
        error: string;
        years?: undefined;
        levels?: undefined;
        surfaces?: undefined;
    } | {
        years: any;
        levels: import("../modules/rank/entity/rank.entity").Rank[];
        surfaces: import("../modules/court/entity/court.entity").Court[];
        error?: undefined;
    }>;
    findAll(type: string, year: number, queryParams: CalendarFilterDto): Promise<any> | {
        error: string;
    };
}
