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
exports.TournamentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tournament_service_1 = require("../services/tournament.service");
let TournamentController = class TournamentController {
    constructor(tournamentService) {
        this.tournamentService = tournamentService;
    }
    mostVictories(type, name) {
        return this.tournamentService.mostVictories(type, name);
    }
    points(type, name, year) {
        return this.tournamentService.points(type, name, year);
    }
    draws(type, name, year) {
        return this.tournamentService.draws(type, name, year);
    }
    pastChampions(type, name, year) {
        return this.tournamentService.pastChampions(type, name, year);
    }
    tournamentByYear(type, name, year) {
        return this.tournamentService.tournamentByYear(type, name, year);
    }
    years(type, name) {
        return this.tournamentService.years(type, name);
    }
};
__decorate([
    (0, common_1.Get)(':name/most-victories'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "mostVictories", null);
__decorate([
    (0, common_1.Get)(':name/:year/points'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('name')),
    __param(2, (0, common_1.Param)('year', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "points", null);
__decorate([
    (0, common_1.Get)(':name/:year/draws'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('name')),
    __param(2, (0, common_1.Param)('year', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "draws", null);
__decorate([
    (0, common_1.Get)(':name/:year/past-champions'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('name')),
    __param(2, (0, common_1.Param)('year', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "pastChampions", null);
__decorate([
    (0, common_1.Get)(':name/:year'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('name')),
    __param(2, (0, common_1.Param)('year', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "tournamentByYear", null);
__decorate([
    (0, common_1.Get)(':name'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "years", null);
TournamentController = __decorate([
    (0, common_1.Controller)('tennis/api2/tournament/:type'),
    (0, swagger_1.ApiTags)('tournament'),
    __metadata("design:paramtypes", [tournament_service_1.TournamentService])
], TournamentController);
exports.TournamentController = TournamentController;
//# sourceMappingURL=tournament.controller.js.map