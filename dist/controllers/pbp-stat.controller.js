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
exports.PbpStatController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pbp_stat_service_1 = require("../services/pbp-stat.service");
let PbpStatController = class PbpStatController {
    constructor(pbpStatService) {
        this.pbpStatService = pbpStatService;
    }
    getStat(req) {
        return this.pbpStatService.getStats(req);
    }
};
__decorate([
    (0, common_1.Get)(':type'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PbpStatController.prototype, "getStat", null);
PbpStatController = __decorate([
    (0, common_1.Controller)('tennis/api2/pbp-stat'),
    (0, swagger_1.ApiTags)('live-events'),
    __metadata("design:paramtypes", [pbp_stat_service_1.PbpStatService])
], PbpStatController);
exports.PbpStatController = PbpStatController;
//# sourceMappingURL=pbp-stat.controller.js.map