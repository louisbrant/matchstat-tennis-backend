"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("../player/entity/player.entity");
const game_entity_1 = require("../game/entity/game.entity");
const shared_module_1 = require("../shared/shared.module");
const tournament_entity_1 = require("../tournament/entity/tournament.entity");
const prize_entity_1 = require("../points/entity/prize.entity");
const today_entity_1 = require("../today/entity/today.entity");
const h2h_entity_1 = require("../h2h/entity/h2h.entity");
const search_service_1 = require("../../services/search.service");
const search_controller_1 = require("../../controllers/search.controller");
let SearchModule = class SearchModule {
};
SearchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                tournament_entity_1.TournamentAtp,
                tournament_entity_1.TournamentWta,
                prize_entity_1.PointPrize,
                game_entity_1.GameAtp,
                game_entity_1.GameWta,
                player_entity_1.PlayerAtp,
                player_entity_1.PlayerWta,
                today_entity_1.TodayAtp,
                today_entity_1.TodayWta,
                h2h_entity_1.H2hAtp,
                h2h_entity_1.H2hWta,
            ]),
            shared_module_1.SharedModule,
        ],
        controllers: [search_controller_1.SearchController],
        providers: [search_service_1.SearchService],
    })
], SearchModule);
exports.SearchModule = SearchModule;
//# sourceMappingURL=search.module.js.map