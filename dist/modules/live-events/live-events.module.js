"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveEventsModule = void 0;
const common_1 = require("@nestjs/common");
const live_events_service_1 = require("../../services/live-events.service");
const live_events_controller_1 = require("../../controllers/live-events.controller");
const typeorm_1 = require("@nestjs/typeorm");
const today_entity_1 = require("../today/entity/today.entity");
const shared_service_1 = require("../../services/shared.service");
let LiveEventsModule = class LiveEventsModule {
};
LiveEventsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                today_entity_1.TodayAtp,
                today_entity_1.TodayWta,
            ]),
        ],
        controllers: [live_events_controller_1.LiveEventsController],
        providers: [live_events_service_1.LiveEventsService, shared_service_1.SharedService],
    })
], LiveEventsModule);
exports.LiveEventsModule = LiveEventsModule;
//# sourceMappingURL=live-events.module.js.map