import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UpcomingMatchesController} from "../../controllers/upcomingMatches.controller";
import {UpcomingMatchesService} from "../../services/upcomingMatches.service";
import {SharedService} from "../../services/shared.service";
import {TodayAtp, TodayWta} from "../today/entity/today.entity";
import {H2hAtp, H2hWta} from "../h2h/entity/h2h.entity";


@Module({
  imports: [
      TypeOrmModule.forFeature([
      TodayAtp,
      TodayWta,
      H2hAtp,
      H2hWta,
    ])
  ],
  controllers: [UpcomingMatchesController],
  providers: [UpcomingMatchesService, SharedService],
})
export class UpcomingMatchesModule {}
