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
exports.UpcomingMatchesService = void 0;
const common_1 = require("@nestjs/common");
const today_entity_1 = require("../modules/today/entity/today.entity");
const typeorm_1 = require("typeorm");
const shared_service_1 = require("./shared.service");
const typeorm_2 = require("@nestjs/typeorm");
const h2h_entity_1 = require("../modules/h2h/entity/h2h.entity");
const tour_middleware_1 = require("../modules/shared/middlewares/tour.middleware");
let UpcomingMatchesService = class UpcomingMatchesService {
    constructor(sharedService, todayAtpRepository, todayWtaRepository, h2hAtpRepository, h2hWtaRepository) {
        this.sharedService = sharedService;
        this.todayAtpRepository = todayAtpRepository;
        this.todayWtaRepository = todayWtaRepository;
        this.h2hAtpRepository = h2hAtpRepository;
        this.h2hWtaRepository = h2hWtaRepository;
    }
    async upcomingMatches({ date, limit }) {
        let h2hEntityApt = 'H2hAtp';
        let h2hEntityWta = 'H2hWta';
        console.log("!@#");
        const atpMatches = await this.todayAtpRepository
            .createQueryBuilder('today')
            .leftJoinAndSelect('today.player1', 'player1')
            .leftJoinAndSelect('today.player2', 'player2')
            .leftJoin('today.tournament', 'tournament')
            .leftJoinAndSelect('tournament.court', 'court')
            .leftJoinAndMapOne('today.h2h', h2hEntityApt, 'h2h', '(h2h.player1 = player1.id and h2h.player2 = player2.id) or (h2h.player1 = player2.id and h2h.player2 = player1.id)').select([
            'today.id',
            'today.date',
            'today.roundId',
            'today.odd1',
            'today.odd2',
            'today.seed1',
            'today.seed2',
            'player1.id',
            'player1.name',
            'player1.countryAcr',
            'player2.id',
            'player2.name',
            'player2.countryAcr',
            'tournament.name',
            'tournament.date',
            'tournament.id',
            'court.name',
            'h2h.player1Wins',
            'h2h.player2Wins',
        ])
            .where('today.date > :start_at', { start_at: date })
            .addSelect(limit === 1 ? 'MAX(h2h.player1Wins + h2h.player2Wins) as max_sum' : '')
            .andWhere("today.result=''")
            .andWhere('today.live is null')
            .andWhere('today.date is not null')
            .andWhere('today.complete is null')
            .limit(limit * 2)
            .groupBy('today.id, player1.id, player2.id, tournament.id, court.name, court.id, h2h.player1Wins, h2h.player2Wins, h2h.id')
            .orderBy('today.date', 'ASC')
            .getMany()
            .then((todayArray) => {
            return todayArray.map((today) => {
                var _a, _b;
                return ({
                    tournament: today.tournament,
                    court: today.court,
                    roundId: today.roundId,
                    date: today.date,
                    type: tour_middleware_1.TourType.ATP,
                    player1: {
                        name: today.player1.name,
                        odd: today.odd1,
                        countryAcr: today.player1.countryAcr,
                        seed: today.seed1,
                        image: this.sharedService.getPlayerImage(tour_middleware_1.TourType.WTA, today.player1.id),
                        id: today.player1.id
                    },
                    player2: {
                        name: today.player2.name,
                        odd: today.odd2,
                        countryAcr: today.player2.countryAcr,
                        seed: today.seed2,
                        image: this.sharedService.getPlayerImage(tour_middleware_1.TourType.ATP, today.player2.id),
                    },
                    h2h: (((_a = today.h2h) === null || _a === void 0 ? void 0 : _a.player1Wins) || 0) + '-' + (((_b = today.h2h) === null || _b === void 0 ? void 0 : _b.player2Wins) || 0),
                });
            });
        });
        const wtaMatches = await this.todayWtaRepository
            .createQueryBuilder('today')
            .leftJoinAndSelect('today.player1', 'player1')
            .leftJoinAndSelect('today.player2', 'player2')
            .leftJoin('today.tournament', 'tournament')
            .leftJoinAndSelect('tournament.court', 'court')
            .leftJoinAndMapOne('today.h2h', h2hEntityWta, 'h2h', '(h2h.player1 = player1.id and h2h.player2 = player2.id) or (h2h.player1 = player2.id and h2h.player2 = player1.id)')
            .select([
            'today.id',
            'today.date',
            'today.roundId',
            'today.odd1',
            'today.odd2',
            'today.seed1',
            'today.seed2',
            'player1.id',
            'player1.name',
            'player1.countryAcr',
            'player2.id',
            'player2.name',
            'player2.countryAcr',
            'tournament.name',
            'tournament.date',
            'tournament.id',
            'court.name',
            'h2h.player1Wins',
            'h2h.player2Wins',
        ])
            .where('today.date > :start_at', { start_at: date })
            .addSelect(limit === 1 ? 'MAX(h2h.player1Wins + h2h.player2Wins) as max_sum' : '')
            .andWhere("today.result=''")
            .andWhere('today.live is null')
            .andWhere('today.complete is null')
            .andWhere('today.date is not null')
            .limit(limit * 2)
            .orderBy('today.date', 'ASC')
            .groupBy('today.id, player1.id, player2.id, tournament.id, court.name, court.id, h2h.player1Wins, h2h.player2Wins, h2h.id')
            .getMany()
            .then((todayArray) => {
            return todayArray.map((today) => {
                var _a, _b;
                return ({
                    tournament: today.tournament,
                    court: today.court,
                    roundId: today.roundId,
                    date: today.date,
                    type: 'wta',
                    player1: {
                        name: today.player1.name,
                        odd: today.odd1,
                        countryAcr: today.player1.countryAcr,
                        image: this.sharedService.getPlayerImage(tour_middleware_1.TourType.WTA, today.player1.id),
                        id: today.player1.id,
                    },
                    player2: {
                        name: today.player2.name,
                        odd: today.odd2,
                        countryAcr: today.player2.countryAcr,
                        image: this.sharedService.getPlayerImage(tour_middleware_1.TourType.WTA, today.player2.id),
                        id: today.player2.id
                    },
                    h2h: (((_a = today.h2h) === null || _a === void 0 ? void 0 : _a.player1Wins) || 0) + '-' + (((_b = today.h2h) === null || _b === void 0 ? void 0 : _b.player2Wins) || 0),
                });
            });
        });
        const merged = [...atpMatches, ...wtaMatches];
        const firstPart = merged === null || merged === void 0 ? void 0 : merged.splice(0, limit);
        const lastElement = firstPart[firstPart.length - 1];
        const secondPart = merged === null || merged === void 0 ? void 0 : merged.splice(0, limit);
        const lastData = secondPart.filter(item => item.date === lastElement.date);
        const selected = [...firstPart, ...lastData];
        return { matches: selected };
    }
};
UpcomingMatchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(today_entity_1.TodayAtp)),
    __param(2, (0, typeorm_2.InjectRepository)(today_entity_1.TodayWta)),
    __param(3, (0, typeorm_2.InjectRepository)(h2h_entity_1.H2hAtp)),
    __param(4, (0, typeorm_2.InjectRepository)(h2h_entity_1.H2hWta)),
    __metadata("design:paramtypes", [shared_service_1.SharedService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], UpcomingMatchesService);
exports.UpcomingMatchesService = UpcomingMatchesService;
//# sourceMappingURL=upcomingMatches.service.js.map