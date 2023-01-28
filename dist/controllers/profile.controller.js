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
exports.ProfileController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const profile_service_1 = require("../services/profile.service");
const swagger_1 = require("@nestjs/swagger");
const match_played_game_dto_1 = require("../modules/game/dto/match-played-game.dto");
const match_stat_player_dto_1 = require("../modules/player/dto/match-stat-player.dto");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async findProfile(name) {
        return await this.profileService.information(name.trim());
    }
    async findStatistics(name) {
        return await this.profileService.statistics(name.trim());
    }
    async findInterestingH2h(name) {
        return await this.profileService.interestingH2h(name.trim());
    }
    async findUpcomingMatches(name) {
        return await this.profileService.upcomingMatches(name.trim());
    }
    async findBreakdown(name) {
        return await this.profileService.breakdown(name.trim());
    }
    async findSurfaceSummary(name) {
        return await this.profileService.surfaceSummary(name.trim());
    }
    async findMatchesPlayed(name, queryParams) {
        return await this.profileService.matchesPlayed(name.trim(), queryParams);
    }
    async findProfileFilters(name) {
        return await this.profileService.profileFilters(name.trim());
    }
    async findFinals(name, year) {
        return await this.profileService.finals(name.trim(), year);
    }
    async findMatchStats(name, year, queryParams) {
        return await this.profileService.matchStats(name.trim(), year, queryParams);
    }
    async findSearchProfiles(name, type) {
        return await this.profileService.searchProfiles(name.trim(), type);
    }
};
__decorate([
    (0, common_1.Get)(':name'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findProfile", null);
__decorate([
    (0, common_1.Get)(':name/statistics'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findStatistics", null);
__decorate([
    (0, common_1.Get)(':name/interesting'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findInterestingH2h", null);
__decorate([
    (0, common_1.Get)(':name/upcoming'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findUpcomingMatches", null);
__decorate([
    (0, common_1.Get)(':name/breakdown'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findBreakdown", null);
__decorate([
    (0, common_1.Get)(':name/surface-summary'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findSurfaceSummary", null);
__decorate([
    (0, common_1.Get)(':name/matches-played'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, match_played_game_dto_1.MatchPlayedGameDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findMatchesPlayed", null);
__decorate([
    (0, common_1.Get)(':name/filters'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findProfileFilters", null);
__decorate([
    (0, common_1.Get)(':name/finals/:year'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Param)('year', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findFinals", null);
__decorate([
    (0, common_1.Get)(':name/match-stat/:year'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Param)('year')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, match_stat_player_dto_1.MatchStatPlayerDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findMatchStats", null);
__decorate([
    (0, common_1.Get)('search/:name/:type'),
    openapi.ApiResponse({ status: 200, type: [String] }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "findSearchProfiles", null);
ProfileController = __decorate([
    (0, common_1.Controller)('tennis/api2/profile'),
    (0, swagger_1.ApiTags)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map