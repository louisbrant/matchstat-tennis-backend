import { UpdateCountryDto } from 'src/modules/country/dto/update-country.dto';
import { CreateCountryDto } from 'src/modules/country/dto/create-country.dto';
export declare class CountriesService {
    create(createCountryDto: CreateCountryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCountryDto: UpdateCountryDto): string;
    remove(id: number): string;
}
