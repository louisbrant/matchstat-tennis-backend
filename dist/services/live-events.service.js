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
exports.LiveEventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const today_entity_1 = require("../modules/today/entity/today.entity");
const typeorm_2 = require("@nestjs/typeorm");
const shared_service_1 = require("./shared.service");
let LiveEventsService = class LiveEventsService {
    constructor(todayAtpRepository, todayWtaRepository, sharedService) {
        this.todayAtpRepository = todayAtpRepository;
        this.todayWtaRepository = todayWtaRepository;
        this.sharedService = sharedService;
    }
    liveEvents(type) {
        let todayRepository;
        if (type == 'atp') {
            todayRepository = this.todayAtpRepository;
        }
        else if (type == 'wta') {
            todayRepository = this.todayWtaRepository;
        }
        else {
            return { error: 'Type not found!' };
        }
        return todayRepository
            .createQueryBuilder('today')
            .select(['today.id', 'tournament.name', 'tournament.id', 'tournament.date', "tournament.prize", "tournament.courtId"])
            .leftJoin('today.tournament', 'tournament')
            .leftJoinAndSelect('tournament.court', 'court')
            .leftJoinAndSelect('tournament.country', 'country')
            .distinctOn(['tournament.name'])
            .getMany()
            .then((todays) => todays.map((today) => ({
            name: today.tournament.name,
            country: today.tournament.country.name,
            image: this.sharedService.getTournamentImage('atp', today.tournament.id),
            date: today.tournament.date,
            prize: today.tournament.prize,
            courtId: today.tournament.courtId,
            courtName: today.tournament.court.name
        })));
    }
};
LiveEventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(today_entity_1.TodayAtp)),
    __param(1, (0, typeorm_2.InjectRepository)(today_entity_1.TodayWta)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        shared_service_1.SharedService])
], LiveEventsService);
exports.LiveEventsService = LiveEventsService;
//# sourceMappingURL=live-events.service.js.map