"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestingH2hModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_service_1 = require("../../services/shared.service");
const interesting_h2h_controller_1 = require("../../controllers/interesting-h2h.controller");
const interesting_h2h_service_1 = require("../../services/interesting-h2h.service");
const h2h_entity_1 = require("../h2h/entity/h2h.entity");
let InterestingH2hModule = class InterestingH2hModule {
};
InterestingH2hModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                h2h_entity_1.H2hAtp,
                h2h_entity_1.H2hWta,
            ]),
        ],
        controllers: [interesting_h2h_controller_1.InterestingH2hController],
        providers: [interesting_h2h_service_1.InterestingH2hService, shared_service_1.SharedService],
    })
], InterestingH2hModule);
exports.InterestingH2hModule = InterestingH2hModule;
//# sourceMappingURL=interesting-h2h.module.js.map