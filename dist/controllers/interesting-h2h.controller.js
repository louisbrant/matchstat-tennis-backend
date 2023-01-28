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
exports.InterestingH2hController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const interesting_h2h_service_1 = require("../services/interesting-h2h.service");
let InterestingH2hController = class InterestingH2hController {
    constructor(interestingH2hService) {
        this.interestingH2hService = interestingH2hService;
    }
    findInterestingH2h(type) {
        return this.interestingH2hService.interestingH2h(type);
    }
};
__decorate([
    (0, common_1.Get)(':type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InterestingH2hController.prototype, "findInterestingH2h", null);
InterestingH2hController = __decorate([
    (0, common_1.Controller)('tennis/api2/interesting-h2h'),
    (0, swagger_1.ApiTags)('interesting-h2h'),
    __metadata("design:paramtypes", [interesting_h2h_service_1.InterestingH2hService])
], InterestingH2hController);
exports.InterestingH2hController = InterestingH2hController;
//# sourceMappingURL=interesting-h2h.controller.js.map