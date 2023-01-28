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
exports.InterestingH2hService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const h2h_entity_1 = require("../modules/h2h/entity/h2h.entity");
let InterestingH2hService = class InterestingH2hService {
    constructor(h2hAtpRepository, h2hWtaRepository) {
        this.h2hAtpRepository = h2hAtpRepository;
        this.h2hWtaRepository = h2hWtaRepository;
    }
    interestingH2h(type) {
        let h2hRepository;
        if (type == 'atp') {
            h2hRepository = this.h2hAtpRepository;
        }
        else if (type == 'wta') {
            h2hRepository = this.h2hWtaRepository;
        }
        else {
            return { error: 'Type not found!' };
        }
        return h2hRepository
            .createQueryBuilder('h2')
            .leftJoin('h2.player1', 'player1')
            .leftJoin('h2.player2', 'player2')
            .select(['h2.player1Wins', 'h2.player2Wins'])
            .addSelect(['(h2.player1Wins + h2.player2Wins) as totalGames'])
            .addSelect(['player1.countryAcr', 'player2.countryAcr'])
            .addSelect(['player1.name', 'player2.name'])
            .where(`player1.name!= '' AND player1.name!= 'Unknown Player' AND player1.name!= 'Unknown Player/Unknown Player' AND player2.name!='' AND player1.name!= 'Unknown Player' AND player1.name!= 'Unknown Player/Unknown Player' AND player1.id>player2.id`)
            .orderBy('totalGames', 'DESC')
            .limit(10)
            .getMany();
    }
};
InterestingH2hService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(h2h_entity_1.H2hAtp)),
    __param(1, (0, typeorm_2.InjectRepository)(h2h_entity_1.H2hWta)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], InterestingH2hService);
exports.InterestingH2hService = InterestingH2hService;
//# sourceMappingURL=interesting-h2h.service.js.map