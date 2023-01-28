"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PbpStatModule = void 0;
const common_1 = require("@nestjs/common");
const pbp_stat_controller_1 = require("../../controllers/pbp-stat.controller");
const pbp_stat_service_1 = require("../../services/pbp-stat.service");
let PbpStatModule = class PbpStatModule {
};
PbpStatModule = __decorate([
    (0, common_1.Module)({
        controllers: [pbp_stat_controller_1.PbpStatController],
        providers: [pbp_stat_service_1.PbpStatService],
    })
], PbpStatModule);
exports.PbpStatModule = PbpStatModule;
//# sourceMappingURL=pbp-stat.module.js.map