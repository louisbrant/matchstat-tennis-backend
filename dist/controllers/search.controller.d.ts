import { SearchService } from 'src/services/search.service';
export declare class SearchController {
    private searchService;
    constructor(searchService: SearchService);
    elasticSearch(search: string): Promise<any[]>;
    searchByCategory(search: string, category: string): Promise<any>;
}
