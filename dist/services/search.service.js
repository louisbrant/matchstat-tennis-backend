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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("../modules/player/entity/player.entity");
const shared_service_1 = require("./shared.service");
const tournament_entity_1 = require("../modules/tournament/entity/tournament.entity");
let SearchService = class SearchService {
    constructor(playerAtpRepository, playerWtaRepository, tournamentAtpRepository, tournamentWtaRepository, sharedService) {
        this.playerAtpRepository = playerAtpRepository;
        this.playerWtaRepository = playerWtaRepository;
        this.tournamentAtpRepository = tournamentAtpRepository;
        this.tournamentWtaRepository = tournamentWtaRepository;
        this.sharedService = sharedService;
        this.categories = [
            'player_atp',
            'player_wta',
            'tournament_atp',
            'tournament_wta',
        ];
    }
    async elasticSearch(search) {
        const result = [];
        const tournamentAtpSearch = this.tournamentAtpRepository
            .createQueryBuilder('tournament')
            .select(['tournament.name', 'tournament.date'])
            .where(`LOWER(tournament.name) like '%${search}%'`);
        const tournamentWtaSearch = this.tournamentWtaRepository
            .createQueryBuilder('tournament')
            .select(['tournament.name', 'tournament.date'])
            .where(`LOWER(tournament.name) like '%${search}%'`);
        result.push({
            category: 'player_atp',
            total: await this.searchPlayer('atp', search).getCount(),
            result: await this.searchPlayer('atp', search).limit(5).getMany(),
        });
        result.push({
            category: 'player_wta',
            total: await this.searchPlayer('wta', search).getCount(),
            result: await this.searchPlayer('wta', search).limit(5).getMany(),
        });
        result.push({
            category: 'tournament_atp',
            total: await this.searchTournament('atp', search).getCount(),
            result: await this.searchTournament('atp', search).limit(5).getMany(),
        });
        result.push({
            category: 'tournament_wta',
            total: await this.searchTournament('wta', search).getCount(),
            result: await this.searchTournament('wta', search).limit(5).getMany(),
        });
        return result;
    }
    async searchByCategory(search, category) {
        let result;
        if (category == 'player_atp') {
            result = await this.searchPlayer('atp', search).getMany();
        }
        if (category == 'player_wta') {
            result = await this.searchPlayer('wta', search).getMany();
        }
        if (category == 'tournament_atp') {
            result = await this.searchTournament('atp', search).getMany();
        }
        if (category == 'tournament_wta') {
            result = await this.searchTournament('wta', search).getMany();
        }
        return result;
    }
    searchPlayer(type, search) {
        let playerRepository;
        if (type === 'atp') {
            playerRepository = this.playerAtpRepository;
        }
        if (type === 'wta') {
            playerRepository = this.playerWtaRepository;
        }
        return playerRepository
            .createQueryBuilder('player')
            .select(['player.name', 'player.birthday', 'player.countryAcr'])
            .where(`LOWER(player.name) like '%${search}%'`)
            .andWhere("player.name not like '%/%'");
    }
    searchTournament(type, search) {
        let tournamentRepository;
        if (type === 'atp') {
            tournamentRepository = this.tournamentAtpRepository;
        }
        if (type === 'wta') {
            tournamentRepository = this.tournamentWtaRepository;
        }
        return tournamentRepository
            .createQueryBuilder('tournament')
            .select(['tournament.name', 'tournament.date'])
            .where(`LOWER(tournament.name) like '%${search}%'`)
            .orWhere(`to_char(tournament.date, 'YYYY-MM-DD') like '%${search}%'`);
    }
};
SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.PlayerAtp)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.PlayerWta)),
    __param(2, (0, typeorm_1.InjectRepository)(tournament_entity_1.TournamentAtp)),
    __param(3, (0, typeorm_1.InjectRepository)(tournament_entity_1.TournamentWta)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        shared_service_1.SharedService])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map