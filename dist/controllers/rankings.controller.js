"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tour_middleware_1 = require("../modules/shared/middlewares/tour.middleware");
const rankings_service_1 = require("../services/rankings.service");
const ranking_dto_1 = require("../modules/rankings/dto/ranking.dto");
let RankingsController = class RankingsController {
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    findTop10Ranking(type) {
        return this.rankingService.rankingTop10(type);
    }
    findRanking(type, queryParams) {
        return this.rankingService.ranking(type, queryParams);
    }
    findRankingFilters(type) {
        return this.rankingService.rankingFilters(type);
    }
};
__decorate([
    (0, common_1.Get)(':type/top'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RankingsController.prototype, "findTop10Ranking", null);
__decorate([
    (0, common_1.Get)(':type'),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ranking_dto_1.RankingDto]),
    __metadata("design:returntype", void 0)
], RankingsController.prototype, "findRanking", null);
__decorate([
    (0, common_1.Get)(':type/filters'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RankingsController.prototype, "findRankingFilters", null);
RankingsController = __decorate([
    (0, common_1.Controller)('tennis/api2/ranking'),
    (0, swagger_1.ApiTags)('ranking'),
    __metadata("design:paramtypes", [rankings_service_1.RankingsService])
], RankingsController);
exports.RankingsController = RankingsController;
//# sourceMappingURL=rankings.controller.js.map