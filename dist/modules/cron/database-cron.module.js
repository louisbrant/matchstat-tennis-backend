"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseCronModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const h2h_entity_1 = require("../h2h/entity/h2h.entity");
const database_calculation_service_1 = require("./database-calculation.service");
const database_synchronizer_service_1 = require("./database-synchronizer.service");
const player_stat_entity_1 = require("../player-stats/entity/player-stat.entity");
const game_entity_1 = require("../game/entity/game.entity");
const rating_entity_1 = require("../ratings/entity/rating.entity");
const stat_entity_1 = require("../stat/entity/stat.entity");
let DatabaseCronModule = class DatabaseCronModule {
};
DatabaseCronModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([stat_entity_1.StatAtp, stat_entity_1.StatWta, game_entity_1.GameAtp, game_entity_1.GameWta, h2h_entity_1.H2hAtp, h2h_entity_1.H2hWta, player_stat_entity_1.PlayerStatAtp, player_stat_entity_1.PlayerStatWta, rating_entity_1.RatingAtp, rating_entity_1.RatingWta]),
        ],
        providers: [database_calculation_service_1.DatabaseCalculationService, database_synchronizer_service_1.DatabaseSynchronizerService],
    })
], DatabaseCronModule);
exports.DatabaseCronModule = DatabaseCronModule;
//# sourceMappingURL=database-cron.module.js.map