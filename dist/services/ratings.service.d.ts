import { CreateRatingDto } from 'src/modules/ratings/dto/create-rating.dto';
import { UpdateRatingDto } from 'src/modules/ratings/dto/update-rating.dto';
export declare class RatingsService {
    create(createRatingDto: CreateRatingDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRatingDto: UpdateRatingDto): string;
    remove(id: number): string;
}
