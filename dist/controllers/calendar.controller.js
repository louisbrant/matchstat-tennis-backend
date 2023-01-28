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
exports.CalendarController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const calendar_service_1 = require("../services/calendar.service");
const calendar_filter_dto_1 = require("../modules/calendar/dto/calendar-filter.dto");
let CalendarController = class CalendarController {
    constructor(calendarService) {
        this.calendarService = calendarService;
    }
    async findFilters(type) {
        return await this.calendarService.findFilters(type);
    }
    findAll(type, year, queryParams) {
        return this.calendarService.findAll(type, year, queryParams);
    }
};
__decorate([
    (0, common_1.Get)('filters'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "findFilters", null);
__decorate([
    (0, common_1.Get)(':year'),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('year', new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, calendar_filter_dto_1.CalendarFilterDto]),
    __metadata("design:returntype", void 0)
], CalendarController.prototype, "findAll", null);
CalendarController = __decorate([
    (0, common_1.Controller)('tennis/api2/calendar/:type'),
    (0, swagger_1.ApiTags)('calendar'),
    __metadata("design:paramtypes", [calendar_service_1.CalendarService])
], CalendarController);
exports.CalendarController = CalendarController;
//# sourceMappingURL=calendar.controller.js.map