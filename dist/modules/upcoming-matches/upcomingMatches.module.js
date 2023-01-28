"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingMatchesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const upcomingMatches_controller_1 = require("../../controllers/upcomingMatches.controller");
const upcomingMatches_service_1 = require("../../services/upcomingMatches.service");
const shared_service_1 = require("../../services/shared.service");
const today_entity_1 = require("../today/entity/today.entity");
const h2h_entity_1 = require("../h2h/entity/h2h.entity");
let UpcomingMatchesModule = class UpcomingMatchesModule {
};
UpcomingMatchesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                today_entity_1.TodayAtp,
                today_entity_1.TodayWta,
                h2h_entity_1.H2hAtp,
                h2h_entity_1.H2hWta,
            ])
        ],
        controllers: [upcomingMatches_controller_1.UpcomingMatchesController],
        providers: [upcomingMatches_service_1.UpcomingMatchesService, shared_service_1.SharedService],
    })
], UpcomingMatchesModule);
exports.UpcomingMatchesModule = UpcomingMatchesModule;
//# sourceMappingURL=upcomingMatches.module.js.map