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
exports.PlayerStatsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const player_stats_service_1 = require("../services/player-stats.service");
const update_player_stat_dto_1 = require("../modules/player-stats/dto/update-player-stat.dto");
const create_player_stat_dto_1 = require("../modules/player-stats/dto/create-player-stat.dto");
const swagger_1 = require("@nestjs/swagger");
let PlayerStatsController = class PlayerStatsController {
    constructor(playerStatsService) {
        this.playerStatsService = playerStatsService;
    }
    create(createPlayerStatDto) {
        return this.playerStatsService.create(createPlayerStatDto);
    }
    findAll() {
        return this.playerStatsService.findAll();
    }
    findOne(id) {
        return this.playerStatsService.findOne(+id);
    }
    update(id, updatePlayerStatDto) {
        return this.playerStatsService.update(+id, updatePlayerStatDto);
    }
    remove(id) {
        return this.playerStatsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_player_stat_dto_1.CreatePlayerStatDto]),
    __metadata("design:returntype", void 0)
], PlayerStatsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayerStatsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayerStatsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_player_stat_dto_1.UpdatePlayerStatDto]),
    __metadata("design:returntype", void 0)
], PlayerStatsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayerStatsController.prototype, "remove", null);
PlayerStatsController = __decorate([
    (0, common_1.Controller)('tennis/api2/player-stats'),
    (0, swagger_1.ApiTags)('player-stats'),
    __metadata("design:paramtypes", [player_stats_service_1.PlayerStatsService])
], PlayerStatsController);
exports.PlayerStatsController = PlayerStatsController;
//# sourceMappingURL=player-stats.controller.js.map