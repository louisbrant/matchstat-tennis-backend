"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const profile_controller_1 = require("../../controllers/profile.controller");
const profile_service_1 = require("../../services/profile.service");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("../player/entity/player.entity");
const shared_service_1 = require("../../services/shared.service");
const game_entity_1 = require("../game/entity/game.entity");
const rating_entity_1 = require("../ratings/entity/rating.entity");
const player_stat_entity_1 = require("../player-stats/entity/player-stat.entity");
const h2h_entity_1 = require("../h2h/entity/h2h.entity");
const today_entity_1 = require("../today/entity/today.entity");
const game_service_1 = require("../../services/game.service");
const round_entity_1 = require("../round/entity/round.entity");
const stat_entity_1 = require("../stat/entity/stat.entity");
const rank_entity_1 = require("../rank/entity/rank.entity");
const court_entity_1 = require("../court/entity/court.entity");
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                player_entity_1.PlayerAtp,
                player_entity_1.PlayerWta,
                game_entity_1.GameAtp,
                game_entity_1.GameWta,
                rating_entity_1.RatingAtp,
                rating_entity_1.RatingWta,
                player_stat_entity_1.PlayerStatAtp,
                player_stat_entity_1.PlayerStatWta,
                court_entity_1.Court,
                round_entity_1.Round,
                rank_entity_1.Rank,
                h2h_entity_1.H2hAtp,
                h2h_entity_1.H2hWta,
                today_entity_1.TodayAtp,
                today_entity_1.TodayWta,
                stat_entity_1.StatAtp,
                stat_entity_1.StatWta
            ])
        ],
        controllers: [profile_controller_1.ProfileController],
        providers: [profile_service_1.ProfileService, shared_service_1.SharedService, game_service_1.GameService],
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map