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
exports.PointPrizeController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const point_prize_service_1 = require("../services/point-prize.service");
const update_point_dto_1 = require("../modules/points/dto/update-point.dto");
const create_point_dto_1 = require("../modules/points/dto/create-point.dto");
const swagger_1 = require("@nestjs/swagger");
let PointPrizeController = class PointPrizeController {
    constructor(pointsService) {
        this.pointsService = pointsService;
    }
    create(createPointDto) {
        return this.pointsService.create(createPointDto);
    }
    findAll() {
        return this.pointsService.findAll();
    }
    findOne(id) {
        return this.pointsService.findOne(+id);
    }
    update(id, updatePointDto) {
        return this.pointsService.update(+id, updatePointDto);
    }
    remove(id) {
        return this.pointsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_point_dto_1.CreatePointDto]),
    __metadata("design:returntype", void 0)
], PointPrizeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PointPrizeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PointPrizeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_point_dto_1.UpdatePointDto]),
    __metadata("design:returntype", void 0)
], PointPrizeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PointPrizeController.prototype, "remove", null);
PointPrizeController = __decorate([
    (0, common_1.Controller)('tennis/api2/points'),
    (0, swagger_1.ApiTags)('points'),
    __metadata("design:paramtypes", [point_prize_service_1.PointPrizeService])
], PointPrizeController);
exports.PointPrizeController = PointPrizeController;
//# sourceMappingURL=point-prize.controller.js.map