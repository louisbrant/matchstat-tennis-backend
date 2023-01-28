"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const point_prize_module_1 = require("./modules/points/point-prize.module");
const ratings_module_1 = require("./modules/ratings/ratings.module");
const profile_module_1 = require("./modules/profile/profile.module");
const countries_module_1 = require("./modules/country/countries.module");
const ep_module_1 = require("./modules/ep/ep.module");
const player_stats_module_1 = require("./modules/player-stats/player-stats.module");
const shared_module_1 = require("./modules/shared/shared.module");
const calendar_module_1 = require("./modules/calendar/calendar.module");
const today_module_1 = require("./modules/today/today.module");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const stat_module_1 = require("./modules/stat/stat.module");
const tournament_module_1 = require("./modules/tournament/tournament.module");
const game_module_1 = require("./modules/game/game.module");
const h2h_module_1 = require("./modules/h2h/h2h.module");
const round_module_1 = require("./modules/round/round.module");
const common_1 = require("@nestjs/common");
const live_events_module_1 = require("./modules/live-events/live-events.module");
const rankings_module_1 = require("./modules/rankings/rankings.module");
const database_config_1 = require("./database/database.config");
const schedule_1 = require("@nestjs/schedule");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const interesting_h2h_module_1 = require("./modules/interesting-h2h/interesting-h2h.module");
const database_cron_module_1 = require("./modules/cron/database-cron.module");
const search_module_1 = require("./modules/search/search.module");
const upcomingMatches_module_1 = require("./modules/upcoming-matches/upcomingMatches.module");
const pbp_stat_module_1 = require("./modules/pbp-stat/pbp-stat.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env', '.gl.env'],
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: `${process.env.MEDIA_URL}`,
            }),
            typeorm_1.TypeOrmModule.forRoot(database_config_1.default),
            schedule_1.ScheduleModule.forRoot(),
            calendar_module_1.CalendarModule,
            tournament_module_1.TournamentModule,
            game_module_1.GameModule,
            stat_module_1.StatModule,
            ep_module_1.EpModule,
            h2h_module_1.H2hModule,
            point_prize_module_1.PointPrizeModule,
            ratings_module_1.RatingsModule,
            countries_module_1.CountriesModule,
            today_module_1.TodayModule,
            player_stats_module_1.PlayerStatsModule,
            shared_module_1.SharedModule,
            profile_module_1.ProfileModule,
            round_module_1.RoundModule,
            live_events_module_1.LiveEventsModule,
            rankings_module_1.RankingsModule,
            interesting_h2h_module_1.InterestingH2hModule,
            database_cron_module_1.DatabaseCronModule,
            search_module_1.SearchModule,
            upcomingMatches_module_1.UpcomingMatchesModule,
            pbp_stat_module_1.PbpStatModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map