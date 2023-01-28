import { CountriesService } from 'src/services/countries.service';
import { UpdateCountryDto } from 'src/modules/country/dto/update-country.dto';
import { CreateCountryDto } from 'src/modules/country/dto/create-country.dto';
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    create(createCountryDto: CreateCountryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCountryDto: UpdateCountryDto): string;
    remove(id: string): string;
}
