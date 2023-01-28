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
exports.CalendarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tournament_entity_1 = require("../modules/tournament/entity/tournament.entity");
const rank_entity_1 = require("../modules/rank/entity/rank.entity");
const game_service_1 = require("./game.service");
const shared_service_1 = require("./shared.service");
const court_entity_1 = require("../modules/court/entity/court.entity");
let CalendarService = class CalendarService {
    constructor(tournamentAtpRepository, tournamentWtaRepository, courtRepository, rankRepository, connection, gameService, sharedService) {
        this.tournamentAtpRepository = tournamentAtpRepository;
        this.tournamentWtaRepository = tournamentWtaRepository;
        this.courtRepository = courtRepository;
        this.rankRepository = rankRepository;
        this.connection = connection;
        this.gameService = gameService;
        this.sharedService = sharedService;
    }
    findAll(type, year, queryParams) {
        let tournamentRepository;
        if (type == 'atp') {
            tournamentRepository = this.tournamentAtpRepository;
        }
        else if (type == 'wta') {
            tournamentRepository = this.tournamentWtaRepository;
        }
        else {
            return { error: 'Wrong type!' };
        }
        let query = tournamentRepository
            .createQueryBuilder('tournament')
            .select([
            'tournament.name',
            'tournament.date',
            'tournament.countryAcr',
            'tournament.prize',
            'court.name',
            'court.id',
            'rank.id',
            'rank.name',
            'player1.id',
            'player1.name',
            'player1.countryAcr',
            'player2.id',
            'player2.name',
            'player2.countryAcr',
        ])
            .leftJoin('tournament.court', 'court')
            .leftJoin('tournament.rank', 'rank')
            .leftJoinAndSelect('tournament.games', 'games', '(games.roundId = 12 or games.roundId is null)')
            .leftJoin('games.player1', 'player1')
            .leftJoin('games.player2', 'player2')
            .leftJoinAndMapOne('games.stats', 'StatAtp', 'stats', 'stats.player1 = games.player1 and stats.player2 = games.player2 and stats.tournament = tournament.id')
            .where("(player1.name not like '%/%' or games.player1 is null) and (player2.name not like '%/%' or games.player2 is null)")
            .andWhere(`tournament.date BETWEEN :year and :nextYear`, {
            year: `${year}-01-01`,
            nextYear: `${year}-12-31`,
        });
        if (queryParams === null || queryParams === void 0 ? void 0 : queryParams.surfaces)
            query = query.andWhere('LOWER(court.name) in (:...courtFilter)', {
                courtFilter: queryParams.surfaces
                    .split(',')
                    .map((name) => name.toLowerCase()),
            });
        if (queryParams === null || queryParams === void 0 ? void 0 : queryParams.search)
            query = query.andWhere(`LOWER(tournament.name) like '%${queryParams.search.toLowerCase()}%'`);
        if (queryParams === null || queryParams === void 0 ? void 0 : queryParams.level) {
            if (queryParams.level == '3') {
                query = query.andWhere('rank.name = :queryLevel', {
                    queryLevel: queryParams.level,
                });
            }
            else {
                query = query.andWhere('rank.name = :queryLevel', {
                    queryLevel: queryParams.level,
                });
            }
        }
        return query.getMany().then((tournaments) => {
            return tournaments === null || tournaments === void 0 ? void 0 : tournaments.map((tournament) => (Object.assign(Object.assign({}, tournament), { games: tournament.games.map((game) => {
                    const mapGameStats = this.gameService.mapGameStats(type, game);
                    return {
                        player1: Object.assign(Object.assign({}, mapGameStats.player1), { image: this.sharedService.getPlayerImage(type, game.player1.id), odd: undefined }),
                        player2: Object.assign(Object.assign({}, mapGameStats.player2), { image: this.sharedService.getPlayerImage(type, game.player2.id), odd: undefined }),
                    };
                }) })));
        });
    }
    async findFilters(type) {
        if (type != 'atp' && type != 'wta') {
            return { error: 'Wrong type!' };
        }
        const query = `select distinct extract(year from tour."date") as year from tournament_${type} tour order by year`;
        return {
            years: await this.connection
                .query(query)
                .then((res) => res.map((v) => v.year)),
            levels: await this.rankRepository.find(),
            surfaces: await this.courtRepository.find(),
        };
    }
};
CalendarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tournament_entity_1.TournamentAtp)),
    __param(1, (0, typeorm_1.InjectRepository)(tournament_entity_1.TournamentWta)),
    __param(2, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(3, (0, typeorm_1.InjectRepository)(rank_entity_1.Rank)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection,
        game_service_1.GameService,
        shared_service_1.SharedService])
], CalendarService);
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendar.service.js.map