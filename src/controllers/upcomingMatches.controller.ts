import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {UpcomingMatchesService} from "../services/upcomingMatches.service";
import {UpcomingMatchesDto} from "../modules/upcoming-matches/dto/upcoming-matches.dto";

@Controller('tennis/api2/upcoming')
export class UpcomingMatchesController {

    constructor(
        private readonly upcomingMatchesService: UpcomingMatchesService,
    ) {
    }

    @Post('matches')
    @HttpCode(HttpStatus.OK)
    competitionStandings(@Body() body: UpcomingMatchesDto) {
        return this.upcomingMatchesService.upcomingMatches(body);
    }

}
