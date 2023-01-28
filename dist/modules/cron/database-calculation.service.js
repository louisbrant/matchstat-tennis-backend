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
exports.DatabaseCalculationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const h2h_entity_1 = require("../h2h/entity/h2h.entity");
const player_stat_entity_1 = require("../player-stats/entity/player-stat.entity");
let DatabaseCalculationService = class DatabaseCalculationService {
    constructor(h2hAtpRepository, h2hWtaRepository, playerStatAtpRepository, playerStatWtaRepository, connection) {
        this.h2hAtpRepository = h2hAtpRepository;
        this.h2hWtaRepository = h2hWtaRepository;
        this.playerStatAtpRepository = playerStatAtpRepository;
        this.playerStatWtaRepository = playerStatWtaRepository;
        this.connection = connection;
    }
    selectGames(type) {
        return this.connection.query(`
      SELECT ra1.position "positionPlayer1", ra2.position "positionPlayer2", g.id, g."player1Id", g."player2Id", t."courtId", g."roundId", p2."currentRank", p1."currentRank", t."rankId", t."name", t."date", t."tier", g."result" from game_${type} g
      INNER JOIN tournament_${type} t on t.id=g."tournamentId"
      INNER JOIN player_${type} p1 on p1."id"=g."player1Id"
      INNER JOIN player_${type} p2 on p2."id"=g."player2Id"
      LEFT JOIN rating_${type} ra1 on (p1.id = ra1."playerId" and
                                   (t.date is not null and ra1.date between t.date - INTERVAL '3 DAYS' and t.date + INTERVAL '3 DAYS'
--                                            or g.date is not null and ra1.date between g.date - INTERVAL '3 DAYS' and g.date + INTERVAL '3 DAYS'))
                                       ))
      LEFT JOIN rating_${type} ra2 on (p2.id = ra2."playerId" and
                                   (t.date is not null and ra2.date between t.date - INTERVAL '3 DAYS' and t.date + INTERVAL '3 DAYS'
--                                            or g.date is not null and ra2.date between g.date - INTERVAL '3 DAYS' and g.date + INTERVAL '3 DAYS'))
                                       )) 
WHERE g.result is not null 
AND g.date is not null 
AND g.result != '' 
AND g.result != 'bye' 
AND g.result !='ret.'
AND g."roundId" != 0
AND g."roundId" != 1
AND g."roundId" != 2
AND g."roundId" != 3
AND g.result != 'w/o'
AND t."rankId" != 0
AND t."rankId" != 1
AND t."rankId" != 6
order by g.id
`);
    }
    async calculate(type) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let h2hRepository = this.h2hAtpRepository;
        let playerStatRepository = this.playerStatAtpRepository;
        if (type == 'wta') {
            h2hRepository = this.h2hWtaRepository;
            playerStatRepository = this.playerStatWtaRepository;
        }
        const games = await this.selectGames(type);
        const h2hs = {};
        const stats = {};
        let count = 0;
        for (const game of games) {
            const courtCondition = [0, 1, 2, 3].indexOf(game.roundId) == -1 && [0, 1, 6].indexOf(game.rankId) == -1 && game.result != 'w/o';
            const key = `${game.player1Id}.${game.player2Id}`;
            if (courtCondition) {
                h2hs[key] = {
                    p1: game.player1Id,
                    p2: game.player2Id,
                    count: ((h2hs[key] || {})['count'] || 0) + 1,
                };
            }
            const year = game === null || game === void 0 ? void 0 : game.date.getFullYear();
            let oldData = (stats[game.player1Id] || {})[year] || {};
            let courts = oldData['court'] || { '0': 0 };
            let rounds = oldData['round'] || {};
            let rank = oldData['rank'] || {};
            let level = oldData['level'] || {};
            let levelFinals = oldData['levelFinals'] || {};
            const courtWins = Object.assign({}, courts);
            if (courtCondition) {
                courtWins[game.courtId] = Object.assign(Object.assign({}, (courts[game.courtId] || {})), { w: ((courts[game.courtId] || {})['w'] || 0) + 1 });
            }
            let roundWins = {};
            if (game.result != 'w/o') {
                roundWins = Object.assign({}, rounds);
                roundWins[game.roundId] = Object.assign(Object.assign({}, ((_a = rounds[game.roundId]) !== null && _a !== void 0 ? _a : {})), { w: (((_b = rounds[game.roundId]) !== null && _b !== void 0 ? _b : {})['w'] || 0) + 1 });
            }
            const levelWins = this.getLevel(level, 'w', game.roundId, game.rankId);
            const levelFinalWins = this.getLevelFinals(levelFinals, 'w', game.roundId, game.rankId);
            let rankWins = {};
            if (game.result != 'w/o') {
                rankWins = this.getRank(rank, 'w', game.positionPlayer2 || 101);
            }
            oldData = (stats[game.player2Id] || {})[year] || {};
            courts = oldData['court'] || { '0': 0 };
            rounds = oldData['round'] || {};
            rank = oldData['rank'] || {};
            level = oldData['level'] || {};
            levelFinals = oldData['levelFinals'] || {};
            const courtLoses = Object.assign({}, courts);
            if (courtCondition) {
                courtLoses[game.courtId] = Object.assign(Object.assign({}, (courts[game.courtId] || {})), { l: ((courts[game.courtId] || {})['l'] || 0) + 1 });
            }
            ;
            let roundLoses = {};
            if (game.result != 'w/o') {
                roundLoses = Object.assign({}, rounds);
                roundLoses[game.roundId] = Object.assign(Object.assign({}, ((_c = rounds[game.roundId]) !== null && _c !== void 0 ? _c : {})), { l: (((_d = rounds[game.roundId]) !== null && _d !== void 0 ? _d : {})['l'] || 0) + 1 });
            }
            const levelLoses = this.getLevel(level, 'l', game.roundId, game.rankId);
            const levelFinalLoses = this.getLevelFinals(levelFinals, 'l', game.roundId, game.rankId);
            let rankLoses = {};
            if (game.result != 'w/o') {
                rankLoses = this.getRank(rank, 'l', game.positionPlayer1 || 101);
            }
            if (!((_f = Object.keys((_e = stats[game.player1Id]) !== null && _e !== void 0 ? _e : {})) === null || _f === void 0 ? void 0 : _f.length))
                stats[game.player1Id] = {};
            if (game.player1Id == 1) {
                count++;
            }
            stats[game.player1Id][year] = Object.assign(Object.assign({}, oldData), { court: courtWins, round: roundWins, rank: rankWins, level: levelWins, levelFinals: levelFinalWins });
            if (!((_h = Object.keys((_g = stats[game.player2Id]) !== null && _g !== void 0 ? _g : {})) === null || _h === void 0 ? void 0 : _h.length))
                stats[game.player2Id] = {};
            stats[game.player2Id][year] = Object.assign(Object.assign({}, oldData), { court: courtLoses, round: roundLoses, rank: rankLoses, level: levelLoses, levelFinals: levelFinalLoses });
        }
        await h2hRepository.count().then((val) => {
            if (val == 0) {
                this.connection.manager.query(`
          alter sequence h2h_${type}_id_seq restart;    
          truncate table public.h2h_${type};
        `);
            }
        });
        const h2hToCreate = {};
        const statsToCreate = [];
        for (const h2hKeyWinner of Object.keys(h2hs)) {
            const [id1, id2] = h2hKeyWinner.split('.');
            const h2hKeyLoser = `${id2}.${id1}`;
            const valueWinner = h2hs[h2hKeyWinner];
            const valueLoser = (_j = h2hs[h2hKeyLoser]) !== null && _j !== void 0 ? _j : { count: 0 };
            if (!h2hToCreate[h2hKeyLoser]) {
                h2hToCreate[h2hKeyWinner] = h2hRepository.create({
                    player1Id: valueWinner.p1,
                    player2Id: valueWinner.p2,
                    player1Wins: (_k = valueWinner.count) !== null && _k !== void 0 ? _k : 0,
                    player2Wins: (_l = valueLoser.count) !== null && _l !== void 0 ? _l : 0,
                });
                h2hToCreate[h2hKeyLoser] = h2hRepository.create({
                    player1Id: valueWinner.p2,
                    player2Id: valueWinner.p1,
                    player1Wins: (_m = valueLoser.count) !== null && _m !== void 0 ? _m : 0,
                    player2Wins: (_o = valueWinner.count) !== null && _o !== void 0 ? _o : 0,
                });
            }
        }
        for (const keyStat of Object.keys(stats)) {
            statsToCreate.push(playerStatRepository.create({
                playerId: parseInt(keyStat),
                data: JSON.stringify(stats[keyStat]),
            }));
        }
        const fragmentSize = 5000;
        const h2hFragments = [];
        const h2hToCreateValues = Object.values(h2hToCreate);
        for (let i = 0; i * fragmentSize < h2hToCreateValues.length; i++) {
            h2hFragments.push(h2hToCreateValues.slice(i * fragmentSize, i * fragmentSize + fragmentSize));
        }
        for (const h2h of h2hFragments) {
            const updateValues = h2h
                .map((item) => `(${[
                item.player1Id,
                item.player2Id,
                item.player1Wins,
                item.player2Wins,
            ].join(',')})`)
                .join(',');
            await this.connection.query(`
        insert into public.h2h_${type} ("player1Id", "player2Id", "player1Wins", "player2Wins")
        values ${updateValues}
        on conflict ("player1Id", "player2Id")
        do update set "player1Wins"=excluded."player1Wins", "player2Wins"=excluded."player2Wins"
      `);
        }
        await playerStatRepository.count().then((val) => {
            if (val == 0) {
                this.connection.manager.query(`
        alter sequence player_stat_${type}_id_seq restart;
        truncate table public.player_stat_${type};
        `);
            }
        });
        const statsFragments = [];
        for (let i = 0; i * fragmentSize < statsToCreate.length; i++) {
            statsFragments.push(statsToCreate.slice(i * fragmentSize, i * fragmentSize + fragmentSize));
        }
        for (const stats of statsFragments) {
            const updateValues = stats
                .map((item) => `(${["'" + JSON.stringify(item.data) + "'", item.playerId].join(',')})`)
                .join(',');
            await this.connection.query(`
        insert into public.player_stat_${type} ("data", "playerId") values ${updateValues}
        on conflict ("playerId")
        do update set data=excluded.data
      `);
        }
    }
    getRank(rank, type, playerRank) {
        const top1 = Object.assign({}, (rank['top1'] || {}));
        top1[type] = playerRank <= 1 ? (top1[type] || 0) + 1 : top1[type] || 0;
        const top5 = Object.assign({}, (rank['top5'] || {}));
        top5[type] = playerRank <= 5 ? (top5[type] || 0) + 1 : top5[type] || 0;
        const top10 = Object.assign({}, (rank['top10'] || {}));
        top10[type] = playerRank <= 10 ? (top10[type] || 0) + 1 : top10[type] || 0;
        const top20 = Object.assign({}, (rank['top20'] || {}));
        top20[type] = playerRank <= 20 ? (top20[type] || 0) + 1 : top20[type] || 0;
        const top50 = Object.assign({}, (rank['top50'] || {}));
        top50[type] = playerRank <= 50 ? (top50[type] || 0) + 1 : top50[type] || 0;
        const top100 = Object.assign({}, (rank['top100'] || {}));
        top100[type] =
            playerRank <= 100 ? (top100[type] || 0) + 1 : top100[type] || 0;
        return { top1, top5, top10, top20, top50, top100 };
    }
    getLevel(level, type, round, rank) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const getCount = (level, key, type) => (level[key] || {})[type] || 0;
        const mastersCount = getCount(level, 'masters', type);
        const tourFinalsCount = getCount(level, 'tourFinals', type);
        const mainTourCount = getCount(level, 'mainTour', type);
        const grandSlamCount = getCount(level, 'grandSlam', type);
        const futuresCount = getCount(level, 'futures', type);
        const challengersCount = getCount(level, 'challengers', type);
        const cupsCount = getCount(level, 'cups', type);
        const totalCount = getCount(level, 'total', type);
        const masters = (_a = level['masters']) !== null && _a !== void 0 ? _a : {};
        const tourFinals = (_b = level['tourFinals']) !== null && _b !== void 0 ? _b : {};
        const mainTour = (_c = level['mainTour']) !== null && _c !== void 0 ? _c : {};
        const grandSlam = (_d = level['grandSlam']) !== null && _d !== void 0 ? _d : {};
        const cups = (_e = level['cups']) !== null && _e !== void 0 ? _e : {};
        const futures = (_f = level['futures']) !== null && _f !== void 0 ? _f : {};
        const challengers = (_g = level['challengers']) !== null && _g !== void 0 ? _g : {};
        const total = (_h = level['total']) !== null && _h !== void 0 ? _h : {};
        const resultLevel = {
            masters: Object.assign({}, masters),
            tourFinals: Object.assign({}, tourFinals),
            mainTour: Object.assign({}, mainTour),
            grandSlam: Object.assign({}, grandSlam),
            cups: Object.assign({}, cups),
            futures: Object.assign({}, futures),
            challengers: Object.assign({}, challengers),
            total: Object.assign({}, total),
        };
        resultLevel['masters'][type] = [0, 1, 2, 3].indexOf(round) == -1 && rank == 3 ? mastersCount + 1 : mastersCount;
        resultLevel['tourFinals'][type] = [0, 1, 2, 3].indexOf(round) == -1 && rank == 7 && round == 12 ? tourFinalsCount + 1 : tourFinalsCount;
        resultLevel['mainTour'][type] = [0, 1, 2, 3].indexOf(round) == -1 && rank == 2 ? mainTourCount + 1 : mainTourCount;
        resultLevel['grandSlam'][type] = [0, 1, 2, 3].indexOf(round) == -1 && rank == 4 ? grandSlamCount + 1 : grandSlamCount;
        resultLevel['cups'][type] = [0, 1, 2, 3].indexOf(round) == -1 && rank == 5 ? cupsCount + 1 : cupsCount;
        resultLevel['futures'][type] = [0, 1, 2, 3].indexOf(round) == -1 && rank == 0 ? futuresCount + 1 : futuresCount;
        resultLevel['challengers'][type] = [0, 1, 2, 3].indexOf(round) == -1 && rank == 1 ? challengersCount + 1 : challengersCount;
        resultLevel['total'][type] = totalCount + 1;
        return resultLevel;
    }
    getLevelFinals(level, type, round, rank) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const getCount = (level, key, type) => (level[key] || {})[type] || 0;
        const mastersCount = getCount(level, 'masters', type);
        const tourFinalsCount = getCount(level, 'tourFinals', type);
        const mainTourCount = getCount(level, 'mainTour', type);
        const grandSlamCount = getCount(level, 'grandSlam', type);
        const futuresCount = getCount(level, 'futures', type);
        const challengersCount = getCount(level, 'challengers', type);
        const cupsCount = getCount(level, 'cups', type);
        const totalCount = getCount(level, 'total', type);
        const masters = (_a = level['masters']) !== null && _a !== void 0 ? _a : {};
        const tourFinals = (_b = level['tourFinals']) !== null && _b !== void 0 ? _b : {};
        const mainTour = (_c = level['mainTour']) !== null && _c !== void 0 ? _c : {};
        const grandSlam = (_d = level['grandSlam']) !== null && _d !== void 0 ? _d : {};
        const cups = (_e = level['cups']) !== null && _e !== void 0 ? _e : {};
        const futures = (_f = level['futures']) !== null && _f !== void 0 ? _f : {};
        const challengers = (_g = level['challengers']) !== null && _g !== void 0 ? _g : {};
        const total = (_h = level['total']) !== null && _h !== void 0 ? _h : {};
        const resultLevel = {
            masters: Object.assign({}, masters),
            tourFinals: Object.assign({}, tourFinals),
            mainTour: Object.assign({}, mainTour),
            grandSlam: Object.assign({}, grandSlam),
            cups: Object.assign({}, cups),
            futures: Object.assign({}, futures),
            challengers: Object.assign({}, challengers),
            total: Object.assign({}, total),
        };
        resultLevel['masters'][type] = rank == 3 && round == 12 ? mastersCount + 1 : mastersCount;
        resultLevel['tourFinals'][type] = rank == 7 && round == 12 ? tourFinalsCount + 1 : tourFinalsCount;
        resultLevel['mainTour'][type] = rank == 2 && round == 12 ? mainTourCount + 1 : mainTourCount;
        resultLevel['grandSlam'][type] = rank == 4 && round == 12 ? grandSlamCount + 1 : grandSlamCount;
        resultLevel['cups'][type] = rank == 5 && round == 16 ? cupsCount + 1 : cupsCount;
        resultLevel['futures'][type] = rank == 0 && round == 12 ? futuresCount + 1 : futuresCount;
        resultLevel['challengers'][type] = rank == 1 && round == 12 ? challengersCount + 1 : challengersCount;
        resultLevel['total'][type] = totalCount + 1;
        return resultLevel;
    }
};
DatabaseCalculationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(h2h_entity_1.H2hAtp)),
    __param(1, (0, typeorm_2.InjectRepository)(h2h_entity_1.H2hWta)),
    __param(2, (0, typeorm_2.InjectRepository)(player_stat_entity_1.PlayerStatAtp)),
    __param(3, (0, typeorm_2.InjectRepository)(player_stat_entity_1.PlayerStatWta)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Connection])
], DatabaseCalculationService);
exports.DatabaseCalculationService = DatabaseCalculationService;
//# sourceMappingURL=database-calculation.service.js.map