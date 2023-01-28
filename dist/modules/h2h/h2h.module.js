"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.H2hModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const h2h_controller_1 = require("../../controllers/h2h.controller");
const stat_controller_1 = require("../../controllers/stat.controller");
const game_service_1 = require("../../services/game.service");
const h2h_service_1 = require("../../services/h2h.service");
const shared_service_1 = require("../../services/shared.service");
const court_entity_1 = require("../court/entity/court.entity");
const game_entity_1 = require("../game/entity/game.entity");
const player_stat_entity_1 = require("../player-stats/entity/player-stat.entity");
const player_entity_1 = require("../player/entity/player.entity");
const rating_entity_1 = require("../ratings/entity/rating.entity");
const tour_middleware_1 = require("../shared/middlewares/tour.middleware");
const stat_entity_1 = require("../stat/entity/stat.entity");
const today_entity_1 = require("../today/entity/today.entity");
const h2h_entity_1 = require("./entity/h2h.entity");
const rank_entity_1 = require("../rank/entity/rank.entity");
const round_entity_1 = require("../round/entity/round.entity");
const tournament_entity_1 = require("../tournament/entity/tournament.entity");
let H2hModule = class H2hModule {
    configure(consumer) {
        consumer.apply(tour_middleware_1.tour)
            .forRoutes(stat_controller_1.StatController);
    }
};
H2hModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                game_entity_1.GameWta,
                game_entity_1.GameAtp,
                stat_entity_1.StatAtp,
                stat_entity_1.StatWta,
                player_entity_1.PlayerAtp,
                player_entity_1.PlayerWta,
                today_entity_1.TodayAtp,
                today_entity_1.TodayWta,
                h2h_entity_1.H2hAtp,
                h2h_entity_1.H2hWta,
                player_stat_entity_1.PlayerStatAtp,
                player_stat_entity_1.PlayerStatWta,
                tournament_entity_1.TournamentAtp,
                tournament_entity_1.TournamentWta,
                court_entity_1.Court,
                rank_entity_1.Rank,
                round_entity_1.Round,
                rating_entity_1.RatingAtp,
                rating_entity_1.RatingWta
            ])
        ],
        controllers: [h2h_controller_1.H2hController],
        providers: [h2h_service_1.H2hService, shared_service_1.SharedService, game_service_1.GameService],
    })
], H2hModule);
exports.H2hModule = H2hModule;
//# sourceMappingURL=h2h.module.js.map