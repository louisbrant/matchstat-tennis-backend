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
exports.TodayController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_today_dto_1 = require("../modules/today/dto/update-today.dto");
const today_service_1 = require("../services/today.service");
const create_today_dto_1 = require("../modules/today/dto/create-today.dto");
const swagger_1 = require("@nestjs/swagger");
let TodayController = class TodayController {
    constructor(todayService) {
        this.todayService = todayService;
    }
    create(createTodayDto) {
        return this.todayService.create(createTodayDto);
    }
    findAll() {
        return this.todayService.findAll();
    }
    findOne(id) {
        return this.todayService.findOne(+id);
    }
    update(id, updateTodayDto) {
        return this.todayService.update(+id, updateTodayDto);
    }
    remove(id) {
        return this.todayService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_today_dto_1.CreateTodayDto]),
    __metadata("design:returntype", void 0)
], TodayController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodayController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodayController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_today_dto_1.UpdateTodayDto]),
    __metadata("design:returntype", void 0)
], TodayController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodayController.prototype, "remove", null);
TodayController = __decorate([
    (0, common_1.Controller)('tennis/api2/today'),
    (0, swagger_1.ApiTags)('today'),
    __metadata("design:paramtypes", [today_service_1.TodayService])
], TodayController);
exports.TodayController = TodayController;
//# sourceMappingURL=today.controller.js.map