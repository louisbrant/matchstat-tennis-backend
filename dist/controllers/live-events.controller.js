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
exports.LiveEventsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const live_events_service_1 = require("../services/live-events.service");
let LiveEventsController = class LiveEventsController {
    constructor(liveEventService) {
        this.liveEventService = liveEventService;
    }
    findLiveEvents(type) {
        return this.liveEventService.liveEvents(type);
    }
};
__decorate([
    (0, common_1.Get)(':type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LiveEventsController.prototype, "findLiveEvents", null);
LiveEventsController = __decorate([
    (0, common_1.Controller)('tennis/api2/live-events'),
    (0, swagger_1.ApiTags)('live-events'),
    __metadata("design:paramtypes", [live_events_service_1.LiveEventsService])
], LiveEventsController);
exports.LiveEventsController = LiveEventsController;
//# sourceMappingURL=live-events.controller.js.map