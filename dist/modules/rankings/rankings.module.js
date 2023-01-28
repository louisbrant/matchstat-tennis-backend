"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_service_1 = require("../../services/shared.service");
const rankings_controller_1 = require("../../controllers/rankings.controller");
const rankings_service_1 = require("../../services/rankings.service");
const rating_entity_1 = require("../ratings/entity/rating.entity");
const country_entity_1 = require("../country/entity/country.entity");
const player_entity_1 = require("../player/entity/player.entity");
const court_entity_1 = require("../court/entity/court.entity");
let RankingsModule = class RankingsModule {
};
RankingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                rating_entity_1.RatingAtp,
                rating_entity_1.RatingWta,
                country_entity_1.Country,
                court_entity_1.Court,
                player_entity_1.PlayerAtp,
                player_entity_1.PlayerWta,
            ]),
        ],
        controllers: [rankings_controller_1.RankingsController],
        providers: [rankings_service_1.RankingsService, shared_service_1.SharedService],
    })
], RankingsModule);
exports.RankingsModule = RankingsModule;
//# sourceMappingURL=rankings.module.js.map