"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("../player/entity/player.entity");
const game_entity_1 = require("../game/entity/game.entity");
const shared_module_1 = require("../shared/shared.module");
const tournament_service_1 = require("../../services/tournament.service");
const tournament_entity_1 = require("./entity/tournament.entity");
const tournament_controller_1 = require("../../controllers/tournament.controller");
const prize_entity_1 = require("../points/entity/prize.entity");
const today_entity_1 = require("../today/entity/today.entity");
const h2h_entity_1 = require("../h2h/entity/h2h.entity");
let TournamentModule = class TournamentModule {
};
TournamentModule = __decorate([
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
        controllers: [tournament_controller_1.TournamentController],
        providers: [tournament_service_1.TournamentService],
    })
], TournamentModule);
exports.TournamentModule = TournamentModule;
//# sourceMappingURL=tournament.module.js.map