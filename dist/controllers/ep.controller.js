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
exports.EpController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_ep_dto_1 = require("../modules/ep/dto/update-ep.dto");
const create_ep_dto_1 = require("../modules/ep/dto/create-ep.dto");
const ep_service_1 = require("../services/ep.service");
const swagger_1 = require("@nestjs/swagger");
let EpController = class EpController {
    constructor(epService) {
        this.epService = epService;
    }
    create(createEpDto) {
        return this.epService.create(createEpDto);
    }
    findAll() {
        return this.epService.findAll();
    }
    findOne(id) {
        return this.epService.findOne(+id);
    }
    update(id, updateEpDto) {
        return this.epService.update(+id, updateEpDto);
    }
    remove(id) {
        return this.epService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ep_dto_1.CreateEpDto]),
    __metadata("design:returntype", void 0)
], EpController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EpController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EpController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ep_dto_1.UpdateEpDto]),
    __metadata("design:returntype", void 0)
], EpController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EpController.prototype, "remove", null);
EpController = __decorate([
    (0, common_1.Controller)('tennis/api2/ep'),
    (0, swagger_1.ApiTags)('ep'),
    __metadata("design:paramtypes", [ep_service_1.EpService])
], EpController);
exports.EpController = EpController;
//# sourceMappingURL=ep.controller.js.map