"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpModule = void 0;
const common_1 = require("@nestjs/common");
const ep_controller_1 = require("../../controllers/ep.controller");
const ep_service_1 = require("../../services/ep.service");
let EpModule = class EpModule {
};
EpModule = __decorate([
    (0, common_1.Module)({
        controllers: [ep_controller_1.EpController],
        providers: [ep_service_1.EpService],
    })
], EpModule);
exports.EpModule = EpModule;
//# sourceMappingURL=ep.module.js.map