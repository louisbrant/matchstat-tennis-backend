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
exports.TournamentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const player_entity_1 = require("../modules/player/entity/player.entity");
const game_entity_1 = require("../modules/game/entity/game.entity");
const shared_service_1 = require("./shared.service");
const tournament_entity_1 = require("../modules/tournament/entity/tournament.entity");
const prize_entity_1 = require("../modules/points/entity/prize.entity");
const today_entity_1 = require("../modules/today/entity/today.entity");
const h2h_entity_1 = require("../modules/h2h/entity/h2h.entity");
let TournamentService = class TournamentService {
    constructor(tournamentAtpRepository, tournamentWtaRepository, gameAtpRepository, gameWtaRepository, playerAtpRepository, playerWtaRepository, todayAtpRepository, todayWtaRepository, h2hAtpRepository, h2hWtaRepository, pointRepository, sharedService, connection) {
        this.tournamentAtpRepository = tournamentAtpRepository;
        this.tournamentWtaRepository = tournamentWtaRepository;
        this.gameAtpRepository = gameAtpRepository;
        this.gameWtaRepository = gameWtaRepository;
        this.playerAtpRepository = playerAtpRepository;
        this.playerWtaRepository = playerWtaRepository;
        this.todayAtpRepository = todayAtpRepository;
        this.todayWtaRepository = todayWtaRepository;
        this.h2hAtpRepository = h2hAtpRepository;
        this.h2hWtaRepository = h2hWtaRepository;
        this.pointRepository = pointRepository;
        this.sharedService = sharedService;
        this.connection = connection;
    }
    async tournamentByYear(type, name, year) {
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
        const currentTournament = await tournamentRepository
            .createQueryBuilder('tournament')
            .where('LOWER(tournament.name) = :tournamentName', {
            tournamentName: name.toLowerCase(),
        })
            .andWhere('tournament.date BETWEEN :year and :nextYear', {
            year: `${year}-01-01`,
            nextYear: `${year}-12-31`,
        })
            .orderBy('tournament.date', 'DESC')
            .getOne();
        if (currentTournament === null || currentTournament === void 0 ? void 0 : currentTournament.id) {
            return tournamentRepository.findOne({
                id: currentTournament.id,
            }, {
                select: ['id', 'name', 'date', 'prize'],
                relations: ['court', 'rank', 'country'],
            });
        }
    }
    async years(type, name) {
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
        const tournamentIds = await this.getTournamentIds(tournamentRepository, name, type);
        const query = `select distinct extract(year from tour.date) as year, tour.name as name
                   from tournament_${type} tour
                   where tour.id in (${tournamentIds.toString()})
                   order by year`;
        return this.connection
            .query(query)
            .then((res) => res.map((v) => ({ year: v.year, tournamentName: v.name })));
    }
    async points(type, name, year) {
        var _a;
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
        const currentTournamentId = (_a = (await tournamentRepository
            .createQueryBuilder('tournament')
            .where('LOWER(tournament.name) = :tournamentName', {
            tournamentName: name.toLowerCase(),
        })
            .andWhere('tournament.date BETWEEN :year and :nextYear', {
            year: `${year}-01-01`,
            nextYear: `${year}-12-31`,
        })
            .orderBy('tournament.date', 'DESC')
            .getOne())) === null || _a === void 0 ? void 0 : _a.id;
        return tournamentRepository
            .createQueryBuilder('tournament')
            .select(['tournament.id'])
            .where('tournament.id = :tournamentId', {
            tournamentId: currentTournamentId,
        })
            .leftJoinAndSelect('tournament.rating', 'rating')
            .leftJoinAndSelect('tournament.singlesPrize', 'singles')
            .getOne()
            .then((tournament) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
            return ({
                winner: {
                    points: ((_a = tournament.rating) === null || _a === void 0 ? void 0 : _a.winner) || null,
                    prize: ((_b = tournament.singlesPrize) === null || _b === void 0 ? void 0 : _b.winner) || null,
                },
                finalist: {
                    points: ((_c = tournament.rating) === null || _c === void 0 ? void 0 : _c.finalist) || null,
                    prize: ((_d = tournament.singlesPrize) === null || _d === void 0 ? void 0 : _d.finalist) || null,
                },
                semiFinalist: {
                    points: ((_e = tournament.rating) === null || _e === void 0 ? void 0 : _e.semiFinalist) || null,
                    prize: ((_f = tournament.singlesPrize) === null || _f === void 0 ? void 0 : _f.semiFinalist) || null,
                },
                quarterFinalist: {
                    points: ((_g = tournament.rating) === null || _g === void 0 ? void 0 : _g.quarterFinalist) || null,
                    prize: ((_h = tournament.singlesPrize) === null || _h === void 0 ? void 0 : _h.quarterFinalist) || null,
                },
                fourth: {
                    points: ((_j = tournament.rating) === null || _j === void 0 ? void 0 : _j.fourth) || null,
                    prize: ((_k = tournament.singlesPrize) === null || _k === void 0 ? void 0 : _k.fourth) || null,
                },
                third: {
                    points: ((_l = tournament.rating) === null || _l === void 0 ? void 0 : _l.third) || null,
                    prize: ((_m = tournament.singlesPrize) === null || _m === void 0 ? void 0 : _m.third) || null,
                },
                second: {
                    points: ((_o = tournament.rating) === null || _o === void 0 ? void 0 : _o.second) || null,
                    prize: ((_p = tournament.singlesPrize) === null || _p === void 0 ? void 0 : _p.second) || null,
                },
                first: {
                    points: ((_q = tournament.rating) === null || _q === void 0 ? void 0 : _q.first) || null,
                    prize: ((_r = tournament.singlesPrize) === null || _r === void 0 ? void 0 : _r.first) || null,
                },
                qualifying: {
                    points: ((_s = tournament.rating) === null || _s === void 0 ? void 0 : _s.qualifying) || null,
                    prize: ((_t = tournament.singlesPrize) === null || _t === void 0 ? void 0 : _t.qualifying) || null,
                },
                qualifyingSecond: {
                    points: ((_u = tournament.rating) === null || _u === void 0 ? void 0 : _u.qualifyingSecond) || null,
                    prize: ((_v = tournament.singlesPrize) === null || _v === void 0 ? void 0 : _v.qualifyingSecond) || null,
                },
                qualifyingFirst: {
                    points: ((_w = tournament.rating) === null || _w === void 0 ? void 0 : _w.qualifyingFirst) || null,
                    prize: ((_x = tournament.singlesPrize) === null || _x === void 0 ? void 0 : _x.qualifyingFirst) || null,
                },
                preQualifying: {
                    points: ((_y = tournament.rating) === null || _y === void 0 ? void 0 : _y.preQualifying) || null,
                    prize: ((_z = tournament.singlesPrize) === null || _z === void 0 ? void 0 : _z.preQualifying) || null,
                },
            });
        });
    }
    async mostVictories(type, name) {
        let playerRepository;
        let tournamentRepository;
        if (type == 'atp') {
            playerRepository = this.playerAtpRepository;
            tournamentRepository = this.tournamentAtpRepository;
        }
        else if (type == 'wta') {
            playerRepository = this.playerWtaRepository;
            tournamentRepository = this.tournamentWtaRepository;
        }
        else {
            return { error: 'Wrong type!' };
        }
        const tournamentIds = await this.getTournamentIds(tournamentRepository, name, type);
        return playerRepository
            .createQueryBuilder('player')
            .leftJoin('player.gamesWinner', 'gamesWinner', 'gamesWinner.round = 12')
            .leftJoin('gamesWinner.tournament', 'winnerTournament')
            .where('winnerTournament.id in (:...tournamentIds)', { tournamentIds })
            .andWhere("player.name not like '%/%'")
            .andWhere("player.name != 'Unknown Player'")
            .select('player.country', 'countryAcr')
            .addSelect('player.id', 'id')
            .addSelect('COUNT(DISTINCT(gamesWinner.id))::int', 'wins')
            .addSelect('player.name', 'name')
            .orderBy('wins', 'DESC')
            .groupBy('player.id')
            .limit(5)
            .getRawMany()
            .then((res) => {
            return res.map((player) => (Object.assign(Object.assign({}, player), { image: this.sharedService.getPlayerImage(type, player.id) })));
        });
    }
    async draws(type, name, year) {
        let gameRepository;
        let todayRepository;
        let h2hRepository;
        let statEntity;
        let h2hEntity;
        if (type == 'atp') {
            gameRepository = this.gameAtpRepository;
            todayRepository = this.todayAtpRepository;
            h2hRepository = this.h2hAtpRepository;
            statEntity = 'StatAtp';
            h2hEntity = 'H2hAtp';
        }
        else if (type == 'wta') {
            gameRepository = this.gameWtaRepository;
            todayRepository = this.todayWtaRepository;
            h2hRepository = this.h2hWtaRepository;
            statEntity = 'StatWta';
            h2hEntity = 'H2hWta';
        }
        else {
            return { error: 'Wrong type!' };
        }
        const currentGame = await gameRepository
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.tournament', 'tournament')
            .where('LOWER(tournament.name) = :tournamentName', {
            tournamentName: name.toLowerCase(),
        })
            .andWhere('((game.date BETWEEN :year and :nextYear) or (tournament.date BETWEEN :year and :nextYear))', {
            year: `${year}-01-01`,
            nextYear: `${year}-12-31`,
        })
            .orderBy('game.date', 'DESC')
            .getOne();
        let currentTournamentId = 0;
        if (currentGame)
            currentTournamentId = currentGame.tournament.id;
        else
            return {
                singles: [],
                qualifying: [],
                doubles: [],
            };
        return gameRepository
            .createQueryBuilder('game')
            .leftJoin('game.player1', 'player1')
            .leftJoin('game.player2', 'player2')
            .innerJoin('game.tournament', 'tournament', 'tournament.id = :tournamentId', {
            tournamentId: currentTournamentId,
        })
            .leftJoinAndMapOne('game.stats', statEntity, 'stats', 'stats.player1 = game.player1 and stats.player2 = game.player2 and stats.tournament = tournament.id')
            .leftJoinAndMapOne('game.h2h', h2hEntity, 'h2h', 'h2h.player1 = game.player1 and h2h.player2 = game.player2')
            .addSelect(['player1.id', 'player1.name', 'player1.countryAcr'])
            .addSelect(['player2.id', 'player2.name', 'player2.countryAcr'])
            .addSelect(['tournament.id', 'tournament.name'])
            .getMany()
            .then(async (games) => {
            const todayGames = await todayRepository
                .createQueryBuilder('game')
                .leftJoin('game.player1', 'player1')
                .leftJoin('game.player2', 'player2')
                .innerJoin('game.tournament', 'tournament', 'tournament.id = :tournamentId', {
                tournamentId: currentTournamentId,
            })
                .leftJoinAndMapOne('game.stats', statEntity, 'stats', 'stats.player1 = game.player1 and stats.player2 = game.player2 and stats.tournament = tournament.id')
                .leftJoinAndMapOne('game.h2h', h2hEntity, 'h2h', 'h2h.player1 = game.player1 and h2h.player2 = game.player2')
                .addSelect(['player1.id', 'player1.name', 'player1.countryAcr'])
                .addSelect(['player2.id', 'player2.name', 'player2.countryAcr'])
                .addSelect(['tournament.id', 'tournament.name'])
                .orderBy('game.date', 'DESC')
                .getMany();
            games = [
                ...games.filter((game) => todayGames.find((today) => game.draw == today.draw &&
                    game.roundId == today.roundId &&
                    game.tournamentId == today.tournamentId) == -1 || todayGames.length == 0),
                ...todayGames,
            ];
            const semiFinalsSingles = games.filter((game) => game.roundId == 10 && !game.player1.name.includes('/'));
            const finalsSingles = games.filter((game) => game.roundId == 12 && !game.player1.name.includes('/'));
            const semiFinalsDoubles = games.filter((game) => game.roundId == 10 && game.player1.name.includes('/'));
            const finalsDoubles = games.filter((game) => game.roundId == 12 && game.player1.name.includes('/'));
            if (semiFinalsSingles.length == 2 && finalsSingles.length == 0) {
                games.push({
                    id: 0,
                    roundId: 12,
                    result: '',
                    date: semiFinalsSingles[0].date,
                    seed1: semiFinalsSingles[0].seed1,
                    seed2: semiFinalsSingles[0].seed2,
                    odd1: semiFinalsSingles[0].odd1,
                    odd2: semiFinalsSingles[0].odd2,
                    player1Id: semiFinalsSingles[0].player1Id,
                    player2Id: semiFinalsSingles[1].player1Id,
                    tournamentId: semiFinalsSingles[0].tournamentId,
                    player1: semiFinalsSingles[0].player1,
                    player2: semiFinalsSingles[1].player1,
                    tournament: semiFinalsSingles[0].tournament,
                    stats: null,
                    h2h: await this.h2hAtpRepository.findOne({
                        where: {
                            player1Id: semiFinalsSingles[0].player1Id,
                            player2Id: semiFinalsSingles[1].player1Id,
                        },
                    }),
                });
            }
            if (semiFinalsDoubles.length == 2 && finalsDoubles.length == 0) {
                games.push({
                    id: 0,
                    roundId: 12,
                    result: '',
                    date: semiFinalsDoubles[0].date,
                    seed1: semiFinalsDoubles[0].seed1,
                    seed2: semiFinalsDoubles[0].seed2,
                    odd1: semiFinalsDoubles[0].odd1,
                    odd2: semiFinalsDoubles[0].odd2,
                    player1Id: semiFinalsDoubles[0].player1Id,
                    player2Id: semiFinalsDoubles[1].player1Id,
                    tournamentId: semiFinalsDoubles[0].tournamentId,
                    player1: semiFinalsDoubles[0].player1,
                    player2: semiFinalsDoubles[1].player1,
                    tournament: semiFinalsDoubles[0].tournament,
                    stats: null,
                    h2h: await this.h2hAtpRepository.findOne({
                        where: {
                            player1Id: semiFinalsDoubles[0].player1Id,
                            player2Id: semiFinalsDoubles[1].player1Id,
                        },
                    }),
                });
            }
            const gamesMapped = games
                .sort((a, b) => a.draw - b.draw)
                .filter((game) => game.player1Id != game.player2Id)
                .map((game) => (Object.assign(Object.assign(Object.assign({}, game), { id: undefined, stats: undefined, h2h: game.h2h
                    ? `${game.h2h.player1Wins}-${game.h2h.player2Wins}`
                    : null }), this.mapGameStats(type, game))));
            const qualifying = gamesMapped.filter((game) => [3, 2, 1, 0].includes(game.roundId));
            const doubles = gamesMapped.filter((game) => ![3, 2, 1, 0].includes(game.roundId) &&
                game.player1.name.indexOf('/') != -1);
            const singles = gamesMapped.filter((game) => ![3, 2, 1, 0].includes(game.roundId) &&
                game.player1.name.indexOf('/') == -1);
            const playerIdsInSecondRound = new Set();
            const playerIdsInFirstRound = new Set();
            for (const match of singles.filter((match) => match.roundId == 5)) {
                playerIdsInSecondRound.add(match.player1.id);
                playerIdsInSecondRound.add(match.player2.id);
            }
            for (const match of singles.filter((match) => match.roundId == 4)) {
                playerIdsInFirstRound.add(match.player1.id);
                playerIdsInFirstRound.add(match.player2.id);
            }
            const playerByeIds = [
                ...new Set([...playerIdsInSecondRound].filter((x) => !playerIdsInFirstRound.has(x))),
            ];
            const players = playerByeIds.map((id) => {
                const matchWithPlayer = singles.find((match) => match.player1.id == id || match.player2.id == id);
                return matchWithPlayer.player1.id == id
                    ? matchWithPlayer.player1
                    : matchWithPlayer.player2;
            });
            for (const player of players) {
                singles.push({
                    roundId: 4,
                    result: '',
                    date: '',
                    tournamentId: singles[0].tournamentId,
                    tournament: singles[0].tournament,
                    h2h: '',
                    player1: player,
                    player2: null,
                });
            }
            const singlesClear = [];
            singles.forEach((game) => {
                var _a, _b;
                if (singles.filter((item) => game.draw == item.draw && game.roundId == item.roundId).length > 1) {
                    if (((_a = game.player1) === null || _a === void 0 ? void 0 : _a.name) == 'Unknown Player' ||
                        ((_b = game.player2) === null || _b === void 0 ? void 0 : _b.name) == 'Unknown Player') {
                    }
                    else if (singles.filter((item) => {
                        var _a, _b;
                        return ((_a = game.player1) === null || _a === void 0 ? void 0 : _a.name) == ((_b = item.player2) === null || _b === void 0 ? void 0 : _b.name) &&
                            game.draw == item.draw &&
                            game.roundId == item.roundId;
                    }).length > 0 &&
                        game.result == '') {
                    }
                    else {
                        singlesClear.push(game);
                    }
                }
                else {
                    singlesClear.push(game);
                }
            });
            return {
                singles: singlesClear,
                qualifying: qualifying,
                doubles: doubles,
            };
        });
    }
    async pastChampions(type, name, year) {
        let gameRepository;
        let h2hEntity = 'H2hAtp';
        let statEntity = 'StatAtp';
        let tournamentRepository;
        if (type == 'atp') {
            gameRepository = this.gameAtpRepository;
            tournamentRepository = this.tournamentAtpRepository;
        }
        else if (type == 'wta') {
            statEntity = 'StatWta';
            h2hEntity = 'H2hWta';
            gameRepository = this.gameWtaRepository;
            tournamentRepository = this.tournamentWtaRepository;
        }
        else {
            return { error: 'Wrong type!' };
        }
        const tournamentIds = await this.getTournamentIds(tournamentRepository, name, type, year);
        const singlesChampions = await gameRepository
            .createQueryBuilder('game')
            .leftJoin('game.player1', 'player1')
            .leftJoin('game.player2', 'player2')
            .innerJoin('game.tournament', 'tournament', 'tournament.id in (:...tournamentIds)', { tournamentIds, year: `${year}-12-31` })
            .leftJoinAndMapOne('game.stats', `${statEntity}`, 'stats', 'stats.player1 = player1.id and stats.player2 = player2.id and stats.tournament = tournament.id').leftJoinAndMapOne('game.h2h', h2hEntity, 'h2h', '(h2h.player1 = player1.id and h2h.player2 = player2.id)')
            .where('game.round = 12')
            .andWhere("player1.name not like '%/%'")
            .addSelect(['player1.id', 'player1.name', 'player1.countryAcr'])
            .addSelect(['player2.id', 'player2.name', 'player2.countryAcr'])
            .addSelect(['tournament.id', 'tournament.name', 'tournament.date'])
            .orderBy('tournament.date', 'DESC')
            .addOrderBy('game.date', 'DESC')
            .getMany()
            .then((games) => games.map((game) => {
            var _a, _b;
            return (Object.assign(Object.assign(Object.assign(Object.assign({}, game), { id: undefined, stats: undefined, odd1: undefined, odd2: undefined, seed1: undefined, seed2: undefined }), this.mapGameStats(type, game)), { h2h: (((_a = game.h2h) === null || _a === void 0 ? void 0 : _a.player1Wins) || 0) + '-' + (((_b = game.h2h) === null || _b === void 0 ? void 0 : _b.player2Wins) || 0) }));
        }));
        const doublesChampions = await gameRepository
            .createQueryBuilder('game')
            .leftJoin('game.player1', 'player1')
            .leftJoin('game.player2', 'player2')
            .innerJoin('game.tournament', 'tournament', 'tournament.id in (:...tournamentIds) and (tournament.date <= :year or game.date <= :year)', { tournamentIds, year: `${year}-12-31` })
            .leftJoinAndMapOne('game.stats', `${statEntity}`, 'stats', 'stats.player1 = player1.id and stats.player2 = player2.id and stats.tournament = tournament.id')
            .where('game.round = 12')
            .andWhere("player1.name like '%/%'")
            .addSelect(['player1.id', 'player1.name', 'player1.countryAcr'])
            .addSelect(['player2.id', 'player2.name', 'player2.countryAcr'])
            .addSelect(['tournament.id', 'tournament.name', 'tournament.date'])
            .orderBy('tournament.date', 'DESC')
            .addOrderBy('game.date', 'DESC')
            .getMany()
            .then((games) => games.map((game) => (Object.assign(Object.assign(Object.assign({}, game), { id: undefined, stats: undefined, odd1: undefined, odd2: undefined, seed1: undefined, seed2: undefined }), this.mapGameStats(type, game)))));
        return { singlesChampions, doublesChampions };
    }
    mapGameStats(type, game) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
        return {
            player1: Object.assign(Object.assign({}, game.player1), { seed: game.seed1, odd: parseFloat(game.odd1) || null, image: this.sharedService.getPlayerImage(type, game.player1.id), stats: game.stats
                    ? {
                        firstServe: (_a = game.stats) === null || _a === void 0 ? void 0 : _a.firstServe1,
                        firstServeOf: (_b = game.stats) === null || _b === void 0 ? void 0 : _b.firstServeOf1,
                        aces: (_c = game.stats) === null || _c === void 0 ? void 0 : _c.aces1,
                        doubleFaults: (_d = game.stats) === null || _d === void 0 ? void 0 : _d.doubleFaults1,
                        unforcedErrors: (_e = game.stats) === null || _e === void 0 ? void 0 : _e.unforcedErrors1,
                        winningOnFirstServe: (_f = game.stats) === null || _f === void 0 ? void 0 : _f.winningOnFirstServe1,
                        winningOnFirstServeOf: (_g = game.stats) === null || _g === void 0 ? void 0 : _g.winningOnFirstServeOf1,
                        winningOnSecondServe: (_h = game.stats) === null || _h === void 0 ? void 0 : _h.winningOnSecondServe1,
                        winningOnSecondServeOf: (_j = game.stats) === null || _j === void 0 ? void 0 : _j.winningOnSecondServeOf1,
                        winners: (_k = game.stats) === null || _k === void 0 ? void 0 : _k.winners1,
                        breakPointsConverted: (_l = game.stats) === null || _l === void 0 ? void 0 : _l.breakPointsConverted1,
                        breakPointsConvertedOf: (_m = game.stats) === null || _m === void 0 ? void 0 : _m.breakPointsConvertedOf1,
                        netApproaches: (_o = game.stats) === null || _o === void 0 ? void 0 : _o.netApproaches1,
                        netApproachesOf: (_p = game.stats) === null || _p === void 0 ? void 0 : _p.netApproachesOf1,
                        totalPointsWon: (_q = game.stats) === null || _q === void 0 ? void 0 : _q.totalPointsWon1,
                        fastestServe: (_r = game.stats) === null || _r === void 0 ? void 0 : _r.fastestServe1,
                        averageFirstServeSpeed: (_s = game.stats) === null || _s === void 0 ? void 0 : _s.averageFirstServeSpeed1,
                        averageSecondServeSpeed: (_t = game.stats) === null || _t === void 0 ? void 0 : _t.averageSecondServeSpeed1,
                    }
                    : null }),
            player2: Object.assign(Object.assign({}, game.player2), { seed: game.seed2, odd: game.odd2, image: this.sharedService.getPlayerImage(type, game.player2.id), stats: game.stats
                    ? {
                        firstServe: (_u = game.stats) === null || _u === void 0 ? void 0 : _u.firstServe2,
                        firstServeOf: (_v = game.stats) === null || _v === void 0 ? void 0 : _v.firstServeOf2,
                        aces: (_w = game.stats) === null || _w === void 0 ? void 0 : _w.aces2,
                        doubleFaults: (_x = game.stats) === null || _x === void 0 ? void 0 : _x.doubleFaults2,
                        unforcedErrors: (_y = game.stats) === null || _y === void 0 ? void 0 : _y.unforcedErrors2,
                        winningOnFirstServe: (_z = game.stats) === null || _z === void 0 ? void 0 : _z.winningOnFirstServe2,
                        winningOnFirstServeOf: (_0 = game.stats) === null || _0 === void 0 ? void 0 : _0.winningOnFirstServeOf2,
                        winningOnSecondServe: (_1 = game.stats) === null || _1 === void 0 ? void 0 : _1.winningOnSecondServe2,
                        winningOnSecondServeOf: (_2 = game.stats) === null || _2 === void 0 ? void 0 : _2.winningOnSecondServeOf2,
                        winners: (_3 = game.stats) === null || _3 === void 0 ? void 0 : _3.winners2,
                        breakPointsConverted: (_4 = game.stats) === null || _4 === void 0 ? void 0 : _4.breakPointsConverted2,
                        breakPointsConvertedOf: (_5 = game.stats) === null || _5 === void 0 ? void 0 : _5.breakPointsConvertedOf2,
                        netApproaches: (_6 = game.stats) === null || _6 === void 0 ? void 0 : _6.netApproaches2,
                        netApproachesOf: (_7 = game.stats) === null || _7 === void 0 ? void 0 : _7.netApproachesOf2,
                        totalPointsWon: (_8 = game.stats) === null || _8 === void 0 ? void 0 : _8.totalPointsWon2,
                        fastestServe: (_9 = game.stats) === null || _9 === void 0 ? void 0 : _9.fastestServe2,
                        averageFirstServeSpeed: (_10 = game.stats) === null || _10 === void 0 ? void 0 : _10.averageFirstServeSpeed2,
                        averageSecondServeSpeed: (_11 = game.stats) === null || _11 === void 0 ? void 0 : _11.averageSecondServeSpeed2,
                    }
                    : null }),
        };
    }
    async getTournamentIds(repository, name, type, year) {
        const tournament = await this.getTournament(repository, name, year, type).getOne();
        const parents = (await this.getParentTournamentIds(repository, tournament === null || tournament === void 0 ? void 0 : tournament.id, type)).map((tournamentId) => tournamentId.id);
        const children = (await this.getChildrenTournamentIds(repository, tournament.id, type)).map((tournamentId) => tournamentId.id);
        return [...new Set([...parents, ...children])].sort((a, b) => b - a);
    }
    getTournament(repository, name, year, type) {
        let response = repository
            .createQueryBuilder('tournament')
            .where('LOWER(tournament.name) = :tournamentName', {
            tournamentName: name.toLowerCase(),
        });
        if (year) {
            response = response.andWhere('tournament.date BETWEEN :year and :nextYear', {
                year: `${year}-01-01`,
                nextYear: `${year}-12-31`,
            });
        }
        return response;
    }
    getParentTournamentIds(repository, tournamentId, type) {
        return repository.query(`
        WITH RECURSIVE c AS (
            SELECT ${tournamentId} link, ${tournamentId} id
            UNION ALL
            SELECT tour.link, tour.id
            FROM tournament_${type} tour
                     JOIN c ON c.link = tour.id
        )
        SELECT id FROM c;
    `);
    }
    getChildrenTournamentIds(repository, tournamentId, type) {
        return repository.query(`
      WITH RECURSIVE c AS (
          SELECT ${tournamentId} id, ${tournamentId} link
          UNION ALL
          SELECT tour.id, tour.link
          FROM tournament_${type} tour
                   JOIN c ON c.id = tour.link
      )
      SELECT id FROM c;
    `);
    }
};
TournamentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(tournament_entity_1.TournamentAtp)),
    __param(1, (0, typeorm_2.InjectRepository)(tournament_entity_1.TournamentWta)),
    __param(2, (0, typeorm_2.InjectRepository)(game_entity_1.GameAtp)),
    __param(3, (0, typeorm_2.InjectRepository)(game_entity_1.GameWta)),
    __param(4, (0, typeorm_2.InjectRepository)(player_entity_1.PlayerAtp)),
    __param(5, (0, typeorm_2.InjectRepository)(player_entity_1.PlayerWta)),
    __param(6, (0, typeorm_2.InjectRepository)(today_entity_1.TodayAtp)),
    __param(7, (0, typeorm_2.InjectRepository)(today_entity_1.TodayWta)),
    __param(8, (0, typeorm_2.InjectRepository)(h2h_entity_1.H2hAtp)),
    __param(9, (0, typeorm_2.InjectRepository)(h2h_entity_1.H2hWta)),
    __param(10, (0, typeorm_2.InjectRepository)(prize_entity_1.PointPrize)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        shared_service_1.SharedService,
        typeorm_1.Connection])
], TournamentService);
exports.TournamentService = TournamentService;
//# sourceMappingURL=tournament.service.js.map