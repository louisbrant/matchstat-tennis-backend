import { Connection } from 'typeorm';
export declare class PbpStatService {
    private connection;
    constructor(connection: Connection);
    getStats(req: any): Promise<{
        data: any;
    }>;
    getPlayersFilter(req: any): string;
    getMatchFiltersQuery(req: any, type?: string): string;
    getSortQuery(req: any, statCase: any, compareSortBy?: boolean): any;
}
