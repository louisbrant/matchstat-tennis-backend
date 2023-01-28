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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("../modules/player/entity/player.entity");
const shared_service_1 = require("./shared.service");
const game_entity_1 = require("../modules/game/entity/game.entity");
const rating_entity_1 = require("../modules/ratings/entity/rating.entity");
const player_stat_entity_1 = require("../modules/player-stats/entity/player-stat.entity");
const h2h_entity_1 = require("../modules/h2h/entity/h2h.entity");
const today_entity_1 = require("../modules/today/entity/today.entity");
const game_service_1 = require("./game.service");
const round_entity_1 = require("../modules/round/entity/round.entity");
const stat_entity_1 = require("../modules/stat/entity/stat.entity");
const rank_entity_1 = require("../modules/rank/entity/rank.entity");
const court_entity_1 = require("../modules/court/entity/court.entity");
const tour_middleware_1 = require("../modules/shared/middlewares/tour.middleware");
let ProfileService = class ProfileService {
    constructor(playerAtpRepository, playerWtaRepository, playerStatAtpRepository, playerStatWtaRepository, gameAtpRepository, gameWtaRepository, ratingAtpRepository, ratingWtaRepository, h2hAtpRepository, h2hWtaRepository, todayAtpRepository, todayWtaRepository, statAtpRepository, statWtaRepository, courtRepository, roundRepository, rankRepository, sharedService, gameService) {
        this.playerAtpRepository = playerAtpRepository;
        this.playerWtaRepository = playerWtaRepository;
        this.playerStatAtpRepository = playerStatAtpRepository;
        this.playerStatWtaRepository = playerStatWtaRepository;
        this.gameAtpRepository = gameAtpRepository;
        this.gameWtaRepository = gameWtaRepository;
        this.ratingAtpRepository = ratingAtpRepository;
        this.ratingWtaRepository = ratingWtaRepository;
        this.h2hAtpRepository = h2hAtpRepository;
        this.h2hWtaRepository = h2hWtaRepository;
        this.todayAtpRepository = todayAtpRepository;
        this.todayWtaRepository = todayWtaRepository;
        this.statAtpRepository = statAtpRepository;
        this.statWtaRepository = statWtaRepository;
        this.courtRepository = courtRepository;
        this.roundRepository = roundRepository;
        this.rankRepository = rankRepository;
        this.sharedService = sharedService;
        this.gameService = gameService;
    }
    async information(name) {
        var _a, _b, _c, _d, _e;
        const playerResult = await this.getPlayerByName(name);
        const type = playerResult.type;
        const player = playerResult.player;
        let gameRepository = this.gameAtpRepository;
        if (type == 'wta')
            gameRepository = this.gameWtaRepository;
        return Object.assign(Object.assign({}, player), { id: undefined, type: playerResult.type, image: this.sharedService.getPlayerImage(type, player.id), information: Object.assign(Object.assign({}, player.information && player.information[0]), { plays: player.information && ((_b = (_a = player.information[0]) === null || _a === void 0 ? void 0 : _a.plays) === null || _b === void 0 ? void 0 : _b.split(',')[0]), backhand: player.information && ((_e = (_d = (_c = player.information[0]) === null || _c === void 0 ? void 0 : _c.plays) === null || _d === void 0 ? void 0 : _d.split(',')[1]) === null || _e === void 0 ? void 0 : _e.replace('Backhand', '').trim()), playerStatus: await gameRepository
                    .createQueryBuilder('game')
                    .where('game.player1 = :playerId or game.player2 = :playerId', {
                    playerId: player.id,
                })
                    .andWhere('game.date is not null')
                    .select('EXTRACT(year from game.date)', 'year')
                    .distinctOn(['year'])
                    .orderBy('year', 'DESC', 'NULLS LAST')
                    .getRawOne()
                    .then((lastGame) => {
                    const currentYear = new Date().getFullYear();
                    return currentYear - 2 > (lastGame === null || lastGame === void 0 ? void 0 : lastGame.year) ? 'Inactive' : 'Active';
                }) }), finalYears: await gameRepository
                .createQueryBuilder('game')
                .where('game.roundId = 12')
                .andWhere('game.player1 = :playerId', { playerId: player.id })
                .andWhere('game.date is not null')
                .select('EXTRACT(year from game.date)', 'year')
                .distinctOn(['year'])
                .orderBy('year', 'DESC')
                .getRawMany()
                .then((years) => years.map((year) => year.year)) });
    }
    async statistics(name) {
        function getPlayerByName(name, playerRepository) {
            return playerRepository
                .createQueryBuilder('player')
                .where('player.name = :requestName', { requestName: name })
                .select(['player.id', 'player.currentRank'])
                .getOne()
                .then((player) => ({
                id: player === null || player === void 0 ? void 0 : player.id,
                currentRank: player === null || player === void 0 ? void 0 : player.currentRank,
            }));
        }
        let player = await getPlayerByName(name, this.playerAtpRepository);
        let playerId = player.id;
        let currentRank = player.currentRank;
        let gameRepository = this.gameAtpRepository;
        let ratingRepository = this.ratingAtpRepository;
        let playerStatRepository = this.playerStatAtpRepository;
        if (!playerId) {
            player = await getPlayerByName(name, this.playerWtaRepository);
            playerId = player.id;
            currentRank = player.currentRank;
            gameRepository = this.gameWtaRepository;
            ratingRepository = this.ratingWtaRepository;
            playerStatRepository = this.playerStatWtaRepository;
        }
        if (!playerId) {
            return { err: 'Player not found' };
        }
        const recentGames = await this.recentGame(playerId, gameRepository)
            .getMany()
            .then((games) => games
            .map((game) => (game.player1.id == playerId ? 'w' : 'l'))
            .reverse());
        const bestRank = await this.bestRank(playerId, ratingRepository);
        const playerStat = await this.getPlayerStat(playerId, playerStatRepository);
        return Object.assign(Object.assign({ recentGames,
            currentRank, bestRank: bestRank }, playerStat), { totalTitles: await this.getYtdTitles(playerId, gameRepository, true) });
    }
    async interestingH2h(name) {
        const playerResult = await this.getPlayerByName(name);
        const type = playerResult.type;
        const player = playerResult.player;
        let h2hRepository;
        if (type == 'atp') {
            h2hRepository = this.h2hAtpRepository;
        }
        else {
            h2hRepository = this.h2hWtaRepository;
        }
        return h2hRepository
            .createQueryBuilder('h2h')
            .leftJoin('h2h.player2', 'player2')
            .where('h2h.player1 = :playerId', { playerId: player.id })
            .addSelect(['player2.name'])
            .addSelect('(h2h.player1Wins + h2h.player2Wins)', 'wins')
            .limit(12)
            .orderBy('wins', 'DESC')
            .getMany()
            .then((h2hArray) => h2hArray.map((h2h) => ({
            h2h: h2h.player1Wins + '-' + h2h.player2Wins,
            opponent: h2h.player2.name,
        })));
    }
    async upcomingMatches(name) {
        const playerResult = await this.getPlayerByName(name);
        const type = playerResult.type;
        const player = playerResult.player;
        let todayRepository;
        let h2hEntity = '';
        if (type == 'atp') {
            todayRepository = this.todayAtpRepository;
            h2hEntity = 'H2hAtp';
        }
        else {
            todayRepository = this.todayWtaRepository;
            h2hEntity = 'H2hWta';
        }
        return todayRepository
            .createQueryBuilder('today')
            .leftJoinAndSelect('today.player1', 'player1')
            .leftJoinAndSelect('today.player2', 'player2')
            .leftJoin('today.tournament', 'tournament')
            .leftJoinAndMapOne('today.h2h', h2hEntity, 'h2h', '(h2h.player1 = player1.id and h2h.player2 = player2.id) or (h2h.player1 = player2.id and h2h.player2 = player1.id)')
            .select([
            'today.id',
            'today.date',
            'today.roundId',
            'today.seed1',
            'today.seed2',
            'today.odd1',
            'today.odd2',
            'player1.id',
            'player1.name',
            'player1.countryAcr',
            'player2.id',
            'player2.name',
            'player2.countryAcr',
            'tournament.name',
            'tournament.date',
            'tournament.id',
            'h2h.player1Wins',
            'h2h.player2Wins',
        ])
            .where('today.complete is null')
            .andWhere("today.result=''")
            .andWhere('today.live is null')
            .andWhere('(today.player1 = :playerId or today.player2 = :playerId)', {
            playerId: player.id,
        })
            .getMany()
            .then((todayArray) => {
            return todayArray.map((today) => {
                var _a, _b;
                return ({
                    tournament: today.tournament,
                    roundId: today.roundId,
                    player1: {
                        name: today.player1.name,
                        seed: today.seed1,
                        odd: today.odd1,
                        countryAcr: today.player1.countryAcr,
                        image: this.sharedService.getPlayerImage(type, today.player1.id),
                    },
                    player2: {
                        name: today.player2.name,
                        seed: today.seed2,
                        odd: today.odd2,
                        countryAcr: today.player2.countryAcr,
                        image: this.sharedService.getPlayerImage(type, today.player2.id),
                    },
                    h2h: (((_a = today.h2h) === null || _a === void 0 ? void 0 : _a.player1Wins) || 0) + '-' + (((_b = today.h2h) === null || _b === void 0 ? void 0 : _b.player2Wins) || 0),
                });
            });
        });
    }
    async breakdown(name) {
        const playerResult = await this.getPlayerByName(name);
        const type = playerResult.type;
        const player = playerResult.player;
        let playerStatRepository = this.playerStatAtpRepository;
        if (type == 'wta') {
            playerStatRepository = this.playerStatWtaRepository;
        }
        return playerStatRepository
            .createQueryBuilder('stat')
            .where('stat.player = :playerId', { playerId: player.id })
            .getOne()
            .then((stat) => {
            let result = [];
            if (stat != undefined) {
                result = JSON.parse(stat.data);
                result['career'] = Object.values(result).reduce((prev, actual) => {
                    const wlResult = (key) => {
                        return Object.values(Object.assign({}, Object.keys(actual[key]).map((objKey) => {
                            var _a, _b, _c, _d, _e, _f, _g, _h;
                            const obj = {};
                            obj[objKey] = {
                                w: ((_b = (_a = prev[key][objKey]) === null || _a === void 0 ? void 0 : _a.w) !== null && _b !== void 0 ? _b : 0) +
                                    ((_d = (_c = actual[key][objKey]) === null || _c === void 0 ? void 0 : _c.w) !== null && _d !== void 0 ? _d : 0),
                                l: ((_f = (_e = prev[key][objKey]) === null || _e === void 0 ? void 0 : _e.l) !== null && _f !== void 0 ? _f : 0) +
                                    ((_h = (_g = actual[key][objKey]) === null || _g === void 0 ? void 0 : _g.l) !== null && _h !== void 0 ? _h : 0),
                            };
                            return obj;
                        }))).reduce((prev, current) => (Object.assign(Object.assign({}, prev), current)));
                    };
                    const court = wlResult('court');
                    const round = wlResult('round');
                    const rank = wlResult('rank');
                    const level = wlResult('level');
                    const levelFinals = wlResult('levelFinals');
                    const temp = {
                        court: Object.assign(Object.assign({}, prev['court']), court),
                        round: Object.assign(Object.assign({}, prev['round']), round),
                        rank: Object.assign(Object.assign({}, prev['rank']), rank),
                        level: Object.assign(Object.assign({}, prev['level']), level),
                        levelFinals: Object.assign(Object.assign({}, prev['levelFinals']), levelFinals),
                    };
                    return temp;
                });
            }
            return result;
        });
    }
    async surfaceSummary(name) {
        const playerResult = await this.getPlayerByName(name);
        const type = playerResult.type;
        const player = playerResult.player;
        let gameRepository = this.gameAtpRepository;
        if (type == 'wta') {
            gameRepository = this.gameWtaRepository;
        }
        return gameRepository
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.tournament', 'tournament')
            .leftJoinAndSelect('tournament.court', 'court')
            .where('(game.player1 = :playerId or game.player2 = :playerId)', {
            playerId: player.id,
        })
            .andWhere('tournament.rank != 0')
            .andWhere('tournament.rank != 1')
            .andWhere('tournament.rank != 6')
            .andWhere('game.roundId != 0')
            .andWhere('game.roundId != 1')
            .andWhere('game.roundId != 2')
            .andWhere('game.roundId != 3')
            .andWhere('game.result is not null')
            .andWhere('game.date is not null')
            .andWhere("game.result != 'w/o'")
            .andWhere("game.result != 'bye'")
            .andWhere("game.result != ''")
            .orderBy('game.date', 'DESC')
            .getMany()
            .then((games) => {
            const response = [];
            const years = new Set();
            for (const game of games) {
                years.add(game.date.getFullYear());
            }
            for (const year of years.values()) {
                let clayWin = 0;
                let clayLose = 0;
                let hardWin = 0;
                let hardLose = 0;
                let ihardWin = 0;
                let ihardLose = 0;
                let grassWin = 0;
                let grassLose = 0;
                for (const game of games.filter((game) => game.date.getFullYear() == year)) {
                    if (game.tournament.courtId == 2) {
                        if (game.player1Id == player.id)
                            clayWin += 1;
                        if (game.player2Id == player.id)
                            clayLose += 1;
                    }
                    if (game.tournament.courtId == 3 || game.tournament.courtId == 4) {
                        if (game.player1Id == player.id)
                            ihardWin += 1;
                        if (game.player2Id == player.id)
                            ihardLose += 1;
                    }
                    if (game.tournament.courtId == 5) {
                        if (game.player1Id == player.id)
                            grassWin += 1;
                        if (game.player2Id == player.id)
                            grassLose += 1;
                    }
                    if (game.tournament.courtId == 1) {
                        if (game.player1Id == player.id)
                            hardWin += 1;
                        if (game.player2Id == player.id)
                            hardLose += 1;
                    }
                }
                const sumWins = clayWin + hardWin + ihardWin + grassWin;
                const sumLosses = clayLose + hardLose + ihardLose + grassLose;
                response.push({
                    year: year,
                    sum: { w: sumWins, l: sumLosses },
                    hard: { w: hardWin, l: hardLose },
                    ihard: { w: ihardWin, l: ihardLose },
                    clay: { w: clayWin, l: clayLose },
                    grass: { w: grassWin, l: grassLose },
                });
            }
            return response;
        });
    }
    async matchesPlayed(name, query) {
        const playerResult = await this.getPlayerByName(name);
        const type = playerResult.type;
        const player = playerResult.player;
        let gameRepository = this.gameAtpRepository;
        let h2hEntity = 'H2hAtp';
        let statEntity = 'StatAtp';
        if (type == 'wta') {
            gameRepository = this.gameWtaRepository;
            h2hEntity = 'H2hWta';
            statEntity = 'StatWta';
        }
        let response = await gameRepository
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.player1', 'player1')
            .leftJoinAndSelect('game.player2', 'player2')
            .leftJoinAndSelect('game.tournament', 'tournament')
            .leftJoinAndMapOne('game.h2h', h2hEntity, 'h2h', '(h2h.player1 = player1.id and h2h.player2 = player2.id)')
            .leftJoinAndMapOne('game.stats', statEntity, 'stats', 'stats.player1 = game.player1 and stats.player2 = game.player2 and stats.tournament = tournament.id')
            .where('(game.player1Id = :playerId or game.player2Id = :playerId)', {
            playerId: player.id,
        })
            .andWhere('game.date is not null')
            .andWhere('game.result is not null')
            .andWhere("game.result != ''")
            .orderBy('game.date', 'DESC');
        if (query === null || query === void 0 ? void 0 : query.level) {
            if (query.level == 3) {
                response = response
                    .leftJoin('tournament.rank', 'rank')
                    .andWhere(`rank.id = :rankFilter and tournament.name not like '%ATP Finals%'`, {
                    rankFilter: query.level,
                });
            }
            else {
                response = response
                    .leftJoin('tournament.rank', 'rank')
                    .andWhere('rank.id = :rankFilter', {
                    rankFilter: query.level,
                });
            }
        }
        response = response.leftJoinAndSelect('tournament.court', 'court');
        if (query === null || query === void 0 ? void 0 : query.court) {
            response = response.andWhere('LOWER(court.name) in (:...courtFilter)', {
                courtFilter: query.court.split(',').map((name) => name.toLowerCase()),
            });
        }
        if (query === null || query === void 0 ? void 0 : query.year) {
            if (parseInt(query === null || query === void 0 ? void 0 : query.year)) {
                let monthDayEnd = new Date(`${query.year.toString()}-12-31`);
                if (query === null || query === void 0 ? void 0 : query.week) {
                    const endDate = new Date(query.year.toString());
                    endDate.setDate(endDate.getDate() + 7 * query.week);
                    monthDayEnd = endDate;
                }
                response = response.andWhere('game.date <= :nextYearFilter', {
                    nextYearFilter: monthDayEnd,
                });
            }
        }
        if (query === null || query === void 0 ? void 0 : query.round) {
            response = response
                .leftJoinAndSelect('game.round', 'round')
                .andWhere('LOWER(round.name) = LOWER(:roundFilter)', {
                roundFilter: query.round,
            });
        }
        if (!(query === null || query === void 0 ? void 0 : query.limit)) {
            query.limit = 10;
        }
        return response
            .limit(query.limit)
            .offset(query.limit * (((query === null || query === void 0 ? void 0 : query.page) || 1) - 1))
            .getMany()
            .then(async (games) => {
            const gamesMapped = games.map((game) => {
                var _a, _b;
                return (Object.assign(Object.assign(Object.assign(Object.assign({}, game), { id: undefined, stats: undefined, odd1: undefined, odd2: undefined, seed1: undefined, seed2: undefined }), this.gameService.mapGameStats(type, game)), { h2h: (((_a = game.h2h) === null || _a === void 0 ? void 0 : _a.player1Wins) || 0) + '-' + (((_b = game.h2h) === null || _b === void 0 ? void 0 : _b.player2Wins) || 0) }));
            });
            const qualifying = gamesMapped.filter((game) => [3, 2, 1, 0].includes(game.round));
            const doubles = gamesMapped.filter((game) => game.player1.name.indexOf('/') != -1);
            const singles = gamesMapped.filter((game) => ![3, 2, 1, 0].includes(game.round) &&
                game.player1.name.indexOf('/') == -1);
            return {
                singles: singles,
                doubles: doubles,
                qualifying: qualifying,
                singlesCount: await response.getCount(),
            };
        });
    }
    async profileFilters(name) {
        const playerResult = await this.getPlayerByName(name);
        const type = playerResult.type;
        const player = playerResult.player;
        let gameRepository = this.gameAtpRepository;
        if (type == 'wta') {
            gameRepository = this.gameWtaRepository;
        }
        return {
            courts: await this.courtRepository.find(),
            rounds: await this.getRounds(),
            level: await this.rankRepository.find(),
            years: await gameRepository
                .createQueryBuilder('game')
                .where('game.player1 = :playerId or game.player2 = :playerId', {
                playerId: player.id,
            })
                .andWhere('game.date is not null')
                .select('EXTRACT(year from game.date)', 'year')
                .distinctOn(['year'])
                .orderBy('year', 'DESC')
                .getRawMany()
                .then((games) => [
                'Career',
                ...games.map((game) => game.year).filter((game) => game),
            ]),
        };
    }
    async getRounds() {
        return await this.roundRepository.find().then((rounds) => {
            function findRoundByName(name) {
                return rounds.find((round) => round.name.toLowerCase() == name);
            }
            const filteredPart = [
                findRoundByName('final'),
                findRoundByName('1/2'),
                findRoundByName('1/4'),
                findRoundByName('first'),
                findRoundByName('second'),
                findRoundByName('third'),
                findRoundByName('fourth'),
                findRoundByName('qualifying'),
                findRoundByName('q-first'),
                findRoundByName('q-second'),
                findRoundByName('pre-q'),
                findRoundByName('rubber 1'),
                findRoundByName('rubber 2'),
                findRoundByName('rubber 3'),
                findRoundByName('rubber 4'),
                findRoundByName('rubber 5'),
                findRoundByName('robin'),
                findRoundByName('bronze'),
            ];
            return Array.from(new Set([...filteredPart, ...rounds]));
        });
    }
    async finals(name, year) {
        const playerResult = await this.getPlayerByName(name);
        const type = playerResult.type;
        const player = playerResult.player;
        let gameRepository = this.gameAtpRepository;
        if (type == 'wta')
            gameRepository = this.gameWtaRepository;
        return gameRepository
            .createQueryBuilder('game')
            .where('game.roundId = 12')
            .andWhere('(game.player1 = :playerId or game.player2 = :playerId)', {
            playerId: player.id,
        })
            .andWhere('game.date is not null')
            .andWhere('tournament.date between :startYear and :endYear', {
            startYear: `${year}-01-01`,
            endYear: `${year}-12-31`,
        })
            .leftJoinAndSelect('game.tournament', 'tournament')
            .leftJoinAndSelect('tournament.court', 'court')
            .leftJoinAndSelect('tournament.country', 'country')
            .getMany()
            .then((games) => {
            const gamesMapper = games.map((game) => ({
                court: game.tournament.court.name,
                country: game.tournament.country,
                name: game.tournament.name,
                date: game.tournament.date,
                rankId: game.tournament.rankId,
                player1Id: game.player1Id,
                player2Id: game.player2Id,
            }));
            const titles = gamesMapper
                .filter((game) => game.player1Id == player.id &&
                [2, 3, 4, 7, 8, 9].indexOf(game.rankId) > -1)
                .map((game) => (Object.assign(Object.assign({}, game), { player1Id: undefined, player2Id: undefined })));
            const finals = gamesMapper
                .filter((game) => game.player1Id != player.id)
                .map((game) => (Object.assign(Object.assign({}, game), { player1Id: undefined, player2Id: undefined })));
            return { titles, finals };
        });
    }
    async matchStats(name, year, params) {
        const playerResult = await this.getPlayerByName(name);
        const type = playerResult.type;
        const player = playerResult.player;
        let statRepository = this.statAtpRepository;
        if (type == 'wta')
            statRepository = this.statWtaRepository;
        let response = statRepository
            .createQueryBuilder('stat')
            .leftJoin('stat.tournament', 'tournament')
            .leftJoin('tournament.games', 'games', '(games.player1Id = :playerId or games.player2Id = :playerId)', {
            playerId: player.id,
        })
            .leftJoinAndSelect('tournament.court', 'court')
            .leftJoinAndSelect('tournament.rank', 'rank')
            .leftJoinAndSelect('games.round', 'round')
            .leftJoin('stat.player1', 'player1')
            .leftJoin('stat.player2', 'player2')
            .addSelect([
            'tournament.id',
            'tournament.name',
            'tournament.date',
            'tournament.countryAcr',
            'games.id',
            'games.roundId',
            'games.result',
            'games.player1Id',
            'games.player2Id',
            'player1.id',
            'player1.name',
            'player2.id',
            'player2.name',
        ])
            .where('(stat.player1 = :playerId or stat.player2 = :playerId)', {
            playerId: player.id,
        });
        if (parseInt(year)) {
            response = response.andWhere(`tournament.date BETWEEN :year and :nextYear`, {
                year: `${year}-01-01`,
                nextYear: `${year}-12-31`,
            });
        }
        if (params === null || params === void 0 ? void 0 : params.level) {
            if (params.level == 3) {
                response = response.andWhere(`rank.id = :level and tournament.name not like '%ATP Finals%'`, { level: params.level });
            }
            else {
                response = response.andWhere('rank.id = :level', {
                    level: params.level,
                });
            }
        }
        if (params === null || params === void 0 ? void 0 : params.court) {
            response = response.andWhere('LOWER(court.name) in (:...court)', {
                court: params.court.split(',').map((name) => name.toLowerCase()),
            });
        }
        if (params === null || params === void 0 ? void 0 : params.round) {
            response = response.andWhere('round.name = :round', {
                round: params.round,
            });
        }
        return response.getMany().then((stats) => {
            var _a, _b;
            stats = stats
                .sort((a, b) => b.id - a.id)
                .filter((stat) => {
                stat.tournament.games = stat.tournament.games.filter((game) => (game.player1Id == stat.player1.id &&
                    game.player2Id == stat.player2.id) ||
                    (game.player2Id == stat.player1.id &&
                        game.player1Id == stat.player2.id));
                return stat.tournament.games.length > 0;
            });
            const sumStatPlayer = this.sumStatWinner.bind(this, stats, player.id);
            const sumStatOpponent = this.sumStatLoser.bind(this, stats, player.id);
            const winningOnFirstServe = sumStatPlayer('winningOnFirstServe');
            const winningOnFirstServeOf = sumStatPlayer('winningOnFirstServeOf');
            const winningOnSecondServe = sumStatPlayer('winningOnSecondServe');
            const winningOnSecondServeOf = sumStatPlayer('winningOnSecondServeOf');
            const winningBreakPointsConverted = sumStatPlayer('breakPointsConverted');
            const winningBreakPointsConvertedOf = sumStatPlayer('breakPointsConvertedOf');
            const opponentWinningOnFirstServe = sumStatOpponent('winningOnFirstServe');
            const opponentWinningOnFirstServeOf = sumStatOpponent('winningOnFirstServeOf');
            const opponentWinningOnSecondServe = sumStatOpponent('winningOnSecondServe');
            const opponentWinningOnSecondServeOf = sumStatOpponent('winningOnSecondServeOf');
            const opponentBreakPointsConverted = sumStatOpponent('breakPointsConverted');
            const opponentBreakPointsConvertedOf = sumStatOpponent('breakPointsConvertedOf');
            const games = stats
                .map((stat) => stat.tournament.games.length)
                .reduce((prev, current) => prev + current, 0);
            let playerWinsCountOnWin = 0;
            let opponentWinsCountOnWin = 0;
            for (const stat of stats) {
                for (const game of stat.tournament.games) {
                    let p1Wins = 0;
                    let p2Wins = 0;
                    for (const set of game.result.split(' ')) {
                        p1Wins += parseInt((_a = set.split('-')[0]) === null || _a === void 0 ? void 0 : _a.split('(')[0]) || 0;
                        p2Wins += parseInt((_b = set.split('-')[1]) === null || _b === void 0 ? void 0 : _b.split('(')[0]) || 0;
                    }
                    if (game.player1Id == player.id) {
                        playerWinsCountOnWin += p1Wins;
                        opponentWinsCountOnWin += p2Wins;
                    }
                    else {
                        playerWinsCountOnWin += p2Wins;
                        opponentWinsCountOnWin += p1Wins;
                    }
                }
            }
            return {
                games: games,
                playerWins: playerWinsCountOnWin,
                opponentWins: opponentWinsCountOnWin,
                serviceStats: {
                    acesGm: {
                        value: sumStatPlayer('aces'),
                        count: (playerWinsCountOnWin + opponentWinsCountOnWin) / 2,
                    },
                    doubleFaultsGm: {
                        value: sumStatPlayer('doubleFaults'),
                        count: (playerWinsCountOnWin + opponentWinsCountOnWin) / 2,
                    },
                    firstServe: {
                        value: sumStatPlayer('firstServe'),
                        count: sumStatPlayer('firstServeOf'),
                    },
                    winningOnFirstServe: {
                        value: winningOnFirstServe,
                        count: winningOnFirstServeOf,
                    },
                    winningOnSecondServe: {
                        value: winningOnSecondServe,
                        count: winningOnSecondServeOf,
                    },
                    srwPtsWin: {
                        value: winningOnFirstServe + winningOnSecondServe,
                        count: winningOnFirstServeOf + winningOnSecondServeOf,
                    },
                },
                returnStats: {
                    opponentAcesGm: {
                        value: sumStatOpponent('aces'),
                        count: (opponentWinsCountOnWin + playerWinsCountOnWin) / 2,
                    },
                    opponentDoubleFaultsGm: {
                        value: sumStatOpponent('doubleFaults'),
                        count: (opponentWinsCountOnWin + playerWinsCountOnWin) / 2,
                    },
                    opponentFirstServe: {
                        value: sumStatOpponent('firstServe'),
                        count: sumStatOpponent('firstServeOf'),
                    },
                    opponentWinningOnFirstServe: {
                        value: opponentWinningOnFirstServeOf - opponentWinningOnFirstServe,
                        count: opponentWinningOnFirstServeOf,
                    },
                    opponentWinningOnSecondServe: {
                        value: opponentWinningOnSecondServeOf - opponentWinningOnSecondServe,
                        count: opponentWinningOnSecondServeOf,
                    },
                    opponentSrwPtsWin: {
                        value: opponentWinningOnFirstServeOf -
                            opponentWinningOnFirstServe +
                            opponentWinningOnSecondServeOf -
                            opponentWinningOnSecondServe,
                        count: opponentWinningOnFirstServeOf + opponentWinningOnSecondServeOf,
                    },
                },
                breakPointsServe: {
                    breakPointSavedGm: {
                        value: opponentBreakPointsConvertedOf - opponentBreakPointsConverted,
                        count: (opponentWinsCountOnWin + playerWinsCountOnWin) / 2,
                    },
                    breakPointFacedGm: {
                        value: opponentBreakPointsConvertedOf,
                        count: (opponentWinsCountOnWin + playerWinsCountOnWin) / 2,
                    },
                    breakPointSave: {
                        value: opponentBreakPointsConvertedOf - opponentBreakPointsConverted,
                        count: opponentBreakPointsConvertedOf,
                    },
                    serviceHold: {
                        value: (opponentWinsCountOnWin + playerWinsCountOnWin) / 2 -
                            opponentBreakPointsConverted,
                        count: (opponentWinsCountOnWin + playerWinsCountOnWin) / 2,
                    },
                },
                breakPointsRtn: {
                    breakPointWonGm: {
                        value: winningBreakPointsConverted,
                        count: (opponentWinsCountOnWin + playerWinsCountOnWin) / 2,
                    },
                    breakPointChanceGm: {
                        value: winningBreakPointsConvertedOf,
                        count: (opponentWinsCountOnWin + playerWinsCountOnWin) / 2,
                    },
                    breakPointWon: {
                        value: winningBreakPointsConverted,
                        count: winningBreakPointsConvertedOf,
                    },
                    opponentHold: {
                        value: (opponentWinsCountOnWin + playerWinsCountOnWin) / 2 -
                            winningBreakPointsConverted,
                        count: (opponentWinsCountOnWin + playerWinsCountOnWin) / 2,
                    },
                },
            };
        });
    }
    async searchProfiles(searchString, type) {
        searchString = searchString.toLowerCase();
        const playerRepo = type === tour_middleware_1.TourType.ATP
            ? this.playerAtpRepository
            : this.playerWtaRepository;
        return playerRepo
            .createQueryBuilder('player')
            .select(['player.name'])
            .where(`lower(player.name) like '%${searchString}%' and player.name not like '%/%'`)
            .getMany()
            .then((players) => players.map((player) => player.name));
    }
    sumStatWinner(object, playerId, property) {
        return object
            .map((stat) => stat.player1.id == playerId
            ? stat[property + '1']
            : stat[property + '2'])
            .reduce((prev, current) => prev + current, 0);
    }
    sumStatLoser(object, playerId, property) {
        return object
            .map((stat) => stat.player1.id != playerId
            ? stat[property + '1']
            : stat[property + '2'])
            .reduce((prev, current) => prev + current, 0);
    }
    async getPlayerByName(name) {
        let type = 'atp';
        let player = await this.getPlayer(name, this.playerAtpRepository);
        if (!player.rating && !player.currentRank) {
            type = 'wta';
            player = await this.getPlayer(name, this.playerWtaRepository);
        }
        return { type, player };
    }
    async getPlayerStat(playerId, playerStatRepository) {
        return await playerStatRepository
            .createQueryBuilder('stat')
            .where('stat.player = :playerId', { playerId })
            .getOne()
            .then(async (playerStat) => {
            var _a, _b;
            let stat = [];
            if (playerStat != undefined) {
                stat = JSON.parse(playerStat.data);
            }
            const mainTours = { wins: 0, losses: 0 };
            const tourFinals = { wins: 0, losses: 0 };
            const master = { wins: 0, losses: 0 };
            const grandSlam = { wins: 0, losses: 0 };
            const cups = { wins: 0, losses: 0 };
            const futures = { wins: 0, losses: 0 };
            const challengers = { wins: 0, losses: 0 };
            const total = { wins: 0, losses: 0 };
            const courts = {};
            let favouriteCourt = undefined;
            for (const year in stat) {
                const levelByYear = stat[year].levelFinals;
                const courtByYear = stat[year].court;
                mainTours.wins += levelByYear['mainTour']['w'] || 0;
                mainTours.losses += levelByYear['mainTour']['l'] || 0;
                tourFinals.wins += levelByYear['tourFinals']['w'] || 0;
                tourFinals.losses += levelByYear['tourFinals']['l'] || 0;
                master.wins += levelByYear['masters']['w'] || 0;
                master.losses += levelByYear['masters']['l'] || 0;
                grandSlam.wins += levelByYear['grandSlam']['w'] || 0;
                grandSlam.losses += levelByYear['grandSlam']['l'] || 0;
                cups.wins += levelByYear['cups']['w'] || 0;
                cups.losses += levelByYear['cups']['l'] || 0;
                futures.wins += levelByYear['futures']['w'] || 0;
                futures.losses += levelByYear['futures']['l'] || 0;
                challengers.wins += levelByYear['challengers']['w'] || 0;
                challengers.losses += levelByYear['challengers']['l'] || 0;
                total.wins += levelByYear['total']['w'] || 0;
                total.losses += levelByYear['total']['l'] || 0;
                for (const courtId in courtByYear) {
                    courts[courtId] = {
                        wins: (((_a = courts[courtId]) === null || _a === void 0 ? void 0 : _a.wins) || 0) + (courtByYear[courtId]['w'] || 0),
                        losses: (((_b = courts[courtId]) === null || _b === void 0 ? void 0 : _b.losses) || 0) +
                            (courtByYear[courtId]['l'] || 0),
                        surfaceId: parseInt(courtId),
                    };
                }
                favouriteCourt = courts['1'];
                for (const courtId in courts) {
                    if (courts[courtId]['wins'] >
                        (favouriteCourt && 'wins' in favouriteCourt
                            ? favouriteCourt['wins']
                            : 0)) {
                        favouriteCourt = courts[courtId];
                    }
                }
            }
            if (favouriteCourt == undefined) {
                favouriteCourt = [];
                favouriteCourt['surfaceId'] = 10;
            }
            return {
                mainTours: mainTours.wins + '-' + mainTours.losses,
                tourFinals: tourFinals.wins + '-' + tourFinals.losses,
                master: master.wins + '-' + master.losses,
                grandSlam: grandSlam.wins + '-' + grandSlam.losses,
                cups: cups.wins + '-' + cups.losses,
                futures: futures.wins + '-' + futures.losses,
                challengers: challengers.wins + '-' + challengers.losses,
                total: total.wins + '-' + total.losses,
                favouriteCourt: Object.assign(Object.assign({}, favouriteCourt), { surface: await this.courtRepository
                        .findOne({ where: { id: favouriteCourt['surfaceId'] } })
                        .then((court) => court.name) }),
            };
        });
    }
    getPlayer(name, playerRepository) {
        return playerRepository
            .createQueryBuilder('player')
            .leftJoin('player.information', 'info')
            .leftJoin('player.country', 'country')
            .select([
            'player.id',
            'player.name',
            'player.birthday',
            'info.turnedPro',
            'info.weight',
            'info.height',
            'info.birthplace',
            'info.residence',
            'info.plays',
            'info.coach',
            'info.site',
            'info.twitter',
            'info.instagram',
            'info.facebook',
            'info.playerStatus',
            'country.name',
            'country.acronym',
        ])
            .leftJoinAndSelect('player.rating', 'rating')
            .where('LOWER(player.name) = :name', { name: name.toLowerCase() })
            .getOne()
            .then((player) => {
            var _a;
            return (Object.assign(Object.assign({}, player), { rating: undefined, currentRank: (_a = player === null || player === void 0 ? void 0 : player.rating.sort((a, b) => b.date.getTime() - a.date.getTime())[0]) === null || _a === void 0 ? void 0 : _a.position }));
        });
    }
    recentGame(playerId, gameRepository) {
        return gameRepository
            .createQueryBuilder('game')
            .leftJoin('game.player1', 'player1')
            .leftJoin('game.player2', 'player2')
            .leftJoin('game.tournament', 'tour')
            .select([
            'game.id',
            'game.date',
            'player1.id',
            'player2.id',
            'player1.name',
            'player2.name',
        ])
            .where('(player1.id = :playerId or player2.id = :playerId) and game.date is not null', { playerId: playerId })
            .andWhere('tour.rank != 0')
            .andWhere('tour.rank != 1')
            .andWhere('tour.rank != 6')
            .andWhere('game.roundId != 0')
            .andWhere('game.roundId != 1')
            .andWhere('game.roundId != 2')
            .andWhere('game.roundId != 3')
            .andWhere('game.result is not null')
            .andWhere('game.date is not null')
            .andWhere("game.result != 'w/o'")
            .andWhere("game.result != 'bye'")
            .andWhere("game.result != ''")
            .limit(10)
            .orderBy('game.date', 'DESC');
    }
    bestRank(id, ratingRepository) {
        return ratingRepository
            .createQueryBuilder('rating')
            .where('rating.player = :playerId', { playerId: id })
            .orderBy('rating.position')
            .addOrderBy('rating.date', 'DESC')
            .getOne()
            .then((rating) => ({
            position: rating === null || rating === void 0 ? void 0 : rating.position,
            date: rating === null || rating === void 0 ? void 0 : rating.date,
        }));
    }
    getYtdTitles(playerId, gameRepo, allTime = false) {
        let year = 1980;
        if (allTime == false) {
            year = new Date().getFullYear();
        }
        const currentYear = new Date().getFullYear();
        return gameRepo
            .createQueryBuilder('game')
            .where('game.roundId = 12')
            .andWhere('tournament.rankId IN (2,3,4,7,8,9)')
            .andWhere('(game.player1 = :playerId)', {
            playerId,
        })
            .andWhere('game.date is not null')
            .andWhere('tournament.date between :startYear and :endYear', {
            startYear: `${year}-01-01`,
            endYear: `${currentYear}-12-31`,
        })
            .leftJoinAndSelect('game.tournament', 'tournament')
            .leftJoinAndSelect('tournament.court', 'court')
            .leftJoinAndSelect('tournament.country', 'country')
            .getCount();
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.PlayerAtp)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.PlayerWta)),
    __param(2, (0, typeorm_1.InjectRepository)(player_stat_entity_1.PlayerStatAtp)),
    __param(3, (0, typeorm_1.InjectRepository)(player_stat_entity_1.PlayerStatWta)),
    __param(4, (0, typeorm_1.InjectRepository)(game_entity_1.GameAtp)),
    __param(5, (0, typeorm_1.InjectRepository)(game_entity_1.GameWta)),
    __param(6, (0, typeorm_1.InjectRepository)(rating_entity_1.RatingAtp)),
    __param(7, (0, typeorm_1.InjectRepository)(rating_entity_1.RatingWta)),
    __param(8, (0, typeorm_1.InjectRepository)(h2h_entity_1.H2hAtp)),
    __param(9, (0, typeorm_1.InjectRepository)(h2h_entity_1.H2hWta)),
    __param(10, (0, typeorm_1.InjectRepository)(today_entity_1.TodayAtp)),
    __param(11, (0, typeorm_1.InjectRepository)(today_entity_1.TodayWta)),
    __param(12, (0, typeorm_1.InjectRepository)(stat_entity_1.StatAtp)),
    __param(13, (0, typeorm_1.InjectRepository)(stat_entity_1.StatWta)),
    __param(14, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(15, (0, typeorm_1.InjectRepository)(round_entity_1.Round)),
    __param(16, (0, typeorm_1.InjectRepository)(rank_entity_1.Rank)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        shared_service_1.SharedService,
        game_service_1.GameService])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map