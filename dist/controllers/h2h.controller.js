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
exports.H2hController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const match_played_game_dto_1 = require("../modules/game/dto/match-played-game.dto");
const tour_middleware_1 = require("../modules/shared/middlewares/tour.middleware");
const h2h_service_1 = require("../services/h2h.service");
let H2hController = class H2hController {
    constructor(h2hService) {
        this.h2hService = h2hService;
    }
    async findProfiles(type, player1, player2, limit) {
        return await this.h2hService.findProfile(type, player1, player2, limit);
    }
    async findH2hStats(type, player1, player2, queryParams) {
        return await this.h2hService.pvpH2hStats(type, player1, player2, queryParams);
    }
    async findMatchesHistory(type, player1, player2, queryParams) {
        return await this.h2hService.pvpMatchesPlayed(type, player1, player2, queryParams);
    }
    async findCurrentEventStats(type, player, player2) {
        return await this.h2hService.findCurrentEventStats(type, player, player2);
    }
    async findBreakDownStats(type, player, queryParams) {
        return await this.h2hService.findBreakdownStats(type, player, queryParams);
    }
    async findRecentMatches(type, player, queryParams) {
        return await this.h2hService.findPlayerRecentMatches(type, player, queryParams);
    }
    async findUpcomingMatches(type, playerOne, playerTwo) {
        return await this.h2hService.findUpcomingMatch(type, playerOne, playerTwo);
    }
    async findFiltersVs(playerOne, playerTwo, type) {
        return await this.h2hService.findFiltersVs(type, playerOne, playerTwo);
    }
    async findFilters(playerOne, playerTwo) {
        return await this.h2hService.findFilters(tour_middleware_1.TourType.ATP, playerOne, playerTwo);
    }
};
__decorate([
    (0, common_1.Get)('profile/:type/:player1/:player2/:limit'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('player1')),
    __param(2, (0, common_1.Param)('player2')),
    __param(3, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], H2hController.prototype, "findProfiles", null);
__decorate([
    (0, common_1.Get)('stats/:type/:player1/:player2'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('player1')),
    __param(2, (0, common_1.Param)('player2')),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, match_played_game_dto_1.MatchPlayedGameDto]),
    __metadata("design:returntype", Promise)
], H2hController.prototype, "findH2hStats", null);
__decorate([
    (0, common_1.Get)('history/:type/:player1/:player2'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('player1')),
    __param(2, (0, common_1.Param)('player2')),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, match_played_game_dto_1.MatchPlayedGameDto]),
    __metadata("design:returntype", Promise)
], H2hController.prototype, "findMatchesHistory", null);
__decorate([
    (0, common_1.Get)('current/:type/:player/:player2'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('player')),
    __param(2, (0, common_1.Param)('player2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], H2hController.prototype, "findCurrentEventStats", null);
__decorate([
    (0, common_1.Get)('breakdown/:type/:player'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('player')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, match_played_game_dto_1.MatchPlayedGameDto]),
    __metadata("design:returntype", Promise)
], H2hController.prototype, "findBreakDownStats", null);
__decorate([
    (0, common_1.Get)('recent/:type/:player'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('player')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, match_played_game_dto_1.MatchPlayedGameDto]),
    __metadata("design:returntype", Promise)
], H2hController.prototype, "findRecentMatches", null);
__decorate([
    (0, common_1.Get)('upcoming/:type/:player1/:player2'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('player1')),
    __param(2, (0, common_1.Param)('player2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], H2hController.prototype, "findUpcomingMatches", null);
__decorate([
    (0, common_1.Get)('filters/:player1/:player2/:type/vs'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('player1')),
    __param(1, (0, common_1.Param)('player2')),
    __param(2, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], H2hController.prototype, "findFiltersVs", null);
__decorate([
    (0, common_1.Get)('filters/:player1/:player2'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('player1')),
    __param(1, (0, common_1.Param)('player2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], H2hController.prototype, "findFilters", null);
H2hController = __decorate([
    (0, common_1.Controller)('tennis/api2/h2h'),
    (0, swagger_1.ApiTags)('h2h'),
    __metadata("design:paramtypes", [h2h_service_1.H2hService])
], H2hController);
exports.H2hController = H2hController;
//# sourceMappingURL=h2h.controller.js.map