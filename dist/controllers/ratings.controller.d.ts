import { CreateRatingDto } from 'src/modules/ratings/dto/create-rating.dto';
import { RatingsService } from 'src/services/ratings.service';
import { UpdateRatingDto } from 'src/modules/ratings/dto/update-rating.dto';
export declare class RatingsController {
    private readonly ratingsService;
    constructor(ratingsService: RatingsService);
    create(createRatingDto: CreateRatingDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRatingDto: UpdateRatingDto): string;
    remove(id: string): string;
}
