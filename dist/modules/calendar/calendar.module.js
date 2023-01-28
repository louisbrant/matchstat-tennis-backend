"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarModule = void 0;
const common_1 = require("@nestjs/common");
const calendar_service_1 = require("../../services/calendar.service");
const calendar_controller_1 = require("../../controllers/calendar.controller");
const stat_entity_1 = require("../stat/entity/stat.entity");
const typeorm_1 = require("@nestjs/typeorm");
const tournament_entity_1 = require("../tournament/entity/tournament.entity");
const rank_entity_1 = require("../rank/entity/rank.entity");
const game_service_1 = require("../../services/game.service");
const shared_service_1 = require("../../services/shared.service");
const court_entity_1 = require("../court/entity/court.entity");
let CalendarModule = class CalendarModule {
};
CalendarModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                tournament_entity_1.TournamentAtp,
                tournament_entity_1.TournamentWta,
                court_entity_1.Court,
                rank_entity_1.Rank,
                stat_entity_1.StatAtp,
                stat_entity_1.StatWta,
            ]),
        ],
        controllers: [calendar_controller_1.CalendarController],
        providers: [calendar_service_1.CalendarService, game_service_1.GameService, shared_service_1.SharedService],
    })
], CalendarModule);
exports.CalendarModule = CalendarModule;
//# sourceMappingURL=calendar.module.js.map