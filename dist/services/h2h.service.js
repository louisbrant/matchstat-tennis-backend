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
exports.H2hService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const game_entity_1 = require("../modules/game/entity/game.entity");
const tour_middleware_1 = require("../modules/shared/middlewares/tour.middleware");
const utils_1 = require("../modules/shared/utils/utils");
const stat_entity_1 = require("../modules/stat/entity/stat.entity");
const today_entity_1 = require("../modules/today/entity/today.entity");
const player_entity_1 = require("../modules/player/entity/player.entity");
const shared_service_1 = require("./shared.service");
const player_stat_entity_1 = require("../modules/player-stats/entity/player-stat.entity");
const court_entity_1 = require("../modules/court/entity/court.entity");
const game_service_1 = require("./game.service");
const rating_entity_1 = require("../modules/ratings/entity/rating.entity");
const round_entity_1 = require("../modules/round/entity/round.entity");
const rank_entity_1 = require("../modules/rank/entity/rank.entity");
const tournament_entity_1 = require("../modules/tournament/entity/tournament.entity");
let H2hService = class H2hService {
    constructor(todayAtpRepo, todayWtaRepo, gameAtpRepo, gameWtaRepo, playerAtpRepo, playerWtaRepo, statAtpRepo, statWtaRepo, playerStatAtpRepo, playerStatWtaRepo, tournamentAtpRepository, tournamentWtaRepository, courtRepository, roundRepository, rankRepository, ratingAtpRepo, ratingWtaRepo, connection, sharedService, gameService) {
        this.todayAtpRepo = todayAtpRepo;
        this.todayWtaRepo = todayWtaRepo;
        this.gameAtpRepo = gameAtpRepo;
        this.gameWtaRepo = gameWtaRepo;
        this.playerAtpRepo = playerAtpRepo;
        this.playerWtaRepo = playerWtaRepo;
        this.statAtpRepo = statAtpRepo;
        this.statWtaRepo = statWtaRepo;
        this.playerStatAtpRepo = playerStatAtpRepo;
        this.playerStatWtaRepo = playerStatWtaRepo;
        this.tournamentAtpRepository = tournamentAtpRepository;
        this.tournamentWtaRepository = tournamentWtaRepository;
        this.courtRepository = courtRepository;
        this.roundRepository = roundRepository;
        this.rankRepository = rankRepository;
        this.ratingAtpRepo = ratingAtpRepo;
        this.ratingWtaRepo = ratingWtaRepo;
        this.connection = connection;
        this.sharedService = sharedService;
        this.gameService = gameService;
    }
    async findProfile(type, playerOne, playerTwo, limit) {
        var _a, _b, _c, _d;
        const playerRepo = type === tour_middleware_1.TourType.ATP ? this.playerAtpRepo : this.playerWtaRepo;
        const gameRepo = type === tour_middleware_1.TourType.ATP ? this.gameAtpRepo : this.gameWtaRepo;
        const playerStatRepo = type === tour_middleware_1.TourType.ATP ? this.playerStatAtpRepo : this.playerStatWtaRepo;
        const ratingRepo = type === tour_middleware_1.TourType.ATP ? this.ratingAtpRepo : this.ratingWtaRepo;
        const player1 = await this.getPlayerByName(playerOne, playerRepo);
        const player1Id = player1.id;
        const player2 = await this.getPlayerByName(playerTwo, playerRepo);
        const player2Id = player2.id;
        const recentGames1 = await this.recentGame(player1Id, gameRepo)
            .getMany()
            .then((games) => games
            .map((game) => (game.player1.id == player1Id ? 'w' : 'l'))
            .reverse());
        const playerStat1 = await this.getPlayerStat(player1Id, playerStatRepo);
        const recentGames2 = await this.recentGame(player2Id, gameRepo)
            .getMany()
            .then((games) => games
            .map((game) => (game.player1.id == player2Id ? 'w' : 'l'))
            .reverse());
        const playerStat2 = await this.getPlayerStat(player2Id, playerStatRepo);
        const bestRank1 = await this.bestRank(player1Id, ratingRepo);
        const bestRank2 = await this.bestRank(player2Id, ratingRepo);
        const currentRank1 = await this.currentRank(player1Id, ratingRepo);
        const currentRank2 = await this.currentRank(player2Id, ratingRepo);
        const ytdWL1 = await this.getYTDWL(player1Id, gameRepo);
        const ytdWL2 = await this.getYTDWL(player2Id, gameRepo);
        const ytdTitles1 = await this.getYtdTitles(player1Id, gameRepo);
        const ytdTitles2 = await this.getYtdTitles(player2Id, gameRepo);
        const careerWL1 = await this.getCareerWL(player1Id, gameRepo);
        const careerWL2 = await this.getCareerWL(player2Id, gameRepo);
        const careerMoney1 = await this.careerMoney(player1Id, gameRepo, type);
        const careerMoney2 = await this.careerMoney(player2Id, gameRepo, type);
        const surfaceData = await this.getSurfaceDataForTwo(player1Id, player2Id, gameRepo);
        return {
            player1: Object.assign(Object.assign(Object.assign(Object.assign({ id: player1.id, name: player1.name, country: player1.country.name, contryAcr: player1.country.acronym, playerStat: playerStat1, image: this.sharedService.getPlayerImage(type, player1.id), birthday: player1.birthday, currentRank: currentRank1, plays: (_b = (_a = player1.information[0]) === null || _a === void 0 ? void 0 : _a.plays) === null || _b === void 0 ? void 0 : _b.split(',')[0], recentGames: recentGames1, bestRank: bestRank1 }, ytdWL1), { ytdWLPercentage: (0, utils_1.countPercentage)(ytdWL1.ytdWon, ytdWL1.ytdWon + ytdWL1.ytdLost), ytdTitles: ytdTitles1 }), careerWL1), { careerWLPercentage: (0, utils_1.countPercentage)(careerWL1.careerWin, careerWL1.careerWin + careerWL1.careerLose), careerMoney: careerMoney1, totalTitles: await this.getYtdTitles(player1Id, gameRepo, true) }),
            player2: Object.assign(Object.assign(Object.assign(Object.assign({ id: player2.id, name: player2.name, country: player2.country.name, contryAcr: player2.country.acronym, playerStat: playerStat2, image: this.sharedService.getPlayerImage(type, player2.id), birthday: player2.birthday, currentRank: currentRank2, plays: (_d = (_c = player2.information[0]) === null || _c === void 0 ? void 0 : _c.plays) === null || _d === void 0 ? void 0 : _d.split(',')[0], recentGames: recentGames2, bestRank: bestRank2 }, ytdWL2), { ytdWLPercentage: (0, utils_1.countPercentage)(ytdWL2.ytdWon, ytdWL2.ytdWon + ytdWL2.ytdLost), ytdTitles: ytdTitles2 }), careerWL2), { careerWLPercentage: (0, utils_1.countPercentage)(careerWL2.careerWin, careerWL2.careerWin + careerWL2.careerLose), careerMoney: careerMoney2, totalTitles: await this.getYtdTitles(player2Id, gameRepo, true) }),
            surfaceData,
        };
    }
    async pvpH2hStats(type, playerOne, playerTwo, query) {
        var _a, _b;
        const playerRepo = type === tour_middleware_1.TourType.ATP ? this.playerAtpRepo : this.playerWtaRepo;
        const statRepo = type === tour_middleware_1.TourType.ATP ? this.statAtpRepo : this.statWtaRepo;
        const h2hTourType = type === tour_middleware_1.TourType.ATP ? 'H2hAtp' : 'H2hWta';
        const gameRepo = type === tour_middleware_1.TourType.ATP ? this.gameAtpRepo : this.gameWtaRepo;
        const game = type === tour_middleware_1.TourType.ATP ? game_entity_1.GameAtp : game_entity_1.GameWta;
        const player1 = await this.getPlayerByName(playerOne, playerRepo);
        const player1Id = player1.id;
        const name1 = player1.name;
        const player2 = await this.getPlayerByName(playerTwo, playerRepo);
        const name2 = player2.name;
        const player2Id = player2.id;
        let allMatches = [];
        const surfaceData = await this.getSurfaceDataForTwo(player1Id, player2Id, gameRepo);
        const courts = (_b = (_a = query.court) === null || _a === void 0 ? void 0 : _a.split(',')) === null || _b === void 0 ? void 0 : _b.map((name) => `'${(name || '').toString().toLowerCase()}'`).join(" ,");
        await gameRepo
            .createQueryBuilder('game')
            .leftJoin('game.player1', 'winner')
            .leftJoin('game.player2', 'loser')
            .addSelect(['winner.id', 'winner.name', 'loser.id', 'loser.name'])
            .leftJoinAndSelect('game.tournament', 'tour')
            .where(`(winner.id = ${player1Id} and loser.id = ${player2Id}) or (winner.id = ${player2Id} and loser.id = ${player1Id})`).andWhere('game.tournamentId=tour.id')
            .andWhere('tour.rankId != 0')
            .andWhere('tour.rankId != 1')
            .andWhere('tour.rankId != 6')
            .andWhere('game.roundId != 0')
            .andWhere('game.roundId != 1')
            .andWhere('game.roundId != 2')
            .andWhere('game.roundId != 3')
            .andWhere('game.result is not null')
            .andWhere('game.date is not null')
            .andWhere("game.result != 'w/o'")
            .andWhere("game.result != 'bye'")
            .andWhere("game.result != ''")
            .andWhere("game.result != 'ret.'")
            .orderBy('tour.date', 'DESC').getMany().then(match => {
            allMatches = match;
        });
        const allMatchesIds = allMatches.map(m => m.id);
        const statMatchIds = [];
        let response = await statRepo
            .createQueryBuilder('stat')
            .leftJoin('stat.player1', 'winner')
            .leftJoin('stat.player2', 'loser')
            .addSelect(['winner.id', 'winner.name', 'loser.id', 'loser.name'])
            .leftJoinAndSelect('stat.tournament', 'tour')
            .leftJoinAndSelect('tour.court', 'court')
            .leftJoinAndSelect('tour.rank', 'rank')
            .leftJoinAndMapOne('stat.game', game, 'game', '(game.player1 = stat.player1 and game.player2 = stat.player2) and game.tournament = tour.id and stat.round = game.roundId')
            .where(`(winner.id = ${player1Id} and loser.id = ${player2Id}) or (winner.id = ${player2Id} and loser.id = ${player1Id})`)
            .andWhere('tour.rankId != 0')
            .andWhere('tour.rankId != 1')
            .andWhere('tour.rankId != 6')
            .andWhere('game.roundId != 0')
            .andWhere('game.roundId != 1')
            .andWhere('game.roundId != 2')
            .andWhere('game.roundId != 3')
            .andWhere('game.result is not null')
            .andWhere('game.date is not null')
            .andWhere("game.result != 'w/o'")
            .andWhere("game.result != 'bye'")
            .andWhere("game.result != ''")
            .andWhere("game.result != 'ret.'")
            .orderBy('tour.date', 'DESC');
        if (query === null || query === void 0 ? void 0 : query.level) {
            if (query.level == 3) {
                response = response.andWhere(`rank.id = '${query.level}' and tour.name not like '%ATP Finals%'`);
            }
            else {
                response = response.andWhere(`rank.id = '${query.level}'`);
            }
        }
        let round;
        if (query === null || query === void 0 ? void 0 : query.round) {
            round = await this.roundRepository.findOne({
                where: {
                    name: query.round
                }
            });
            response = response
                .leftJoinAndSelect('game.round', 'round')
                .andWhere(`LOWER(round.name) = LOWER('${query.round}')`);
        }
        const queries = `SELECT * from (SELECT * FROM (${response.getQuery()}) stats) s 
             ${(query === null || query === void 0 ? void 0 : query.court) ? `where LOWER(court_name) IN (${courts})` : ''}
             ${(query === null || query === void 0 ? void 0 : query.tournament) ? `${(query === null || query === void 0 ? void 0 : query.court) ? 'and' : 'where'} tour_name = '${query.tournament}'` : ''} 
             ${(query === null || query === void 0 ? void 0 : query.level) ? ` ${(query === null || query === void 0 ? void 0 : query.tournament) || (query === null || query === void 0 ? void 0 : query.court) ? 'and' : 'where'} rank_id = '${query.level}'` : ''}
             ${(query === null || query === void 0 ? void 0 : query.round) ? `${(query === null || query === void 0 ? void 0 : query.tournament) || (query === null || query === void 0 ? void 0 : query.court) || (query === null || query === void 0 ? void 0 : query.level) ? 'and' : 'where'}  stat_round = '${round.id}'` : ''}`;
        return await this.connection.query(queries).then(async (stats) => {
            if (stats.length === 0) {
                throw new common_1.NotFoundException('No stats');
            }
            if (stats.some((stat) => stat.game === null)) {
                throw new common_1.NotFoundException('No games');
            }
            const result = {
                gamesServed: 0,
                gamesWon1: 0,
                gamesWon2: 0,
                setsWon1: 0,
                setsWon2: 0,
                avgTime1: 0,
                avgTime2: 0,
                hard1: 0,
                hard2: 0,
                iHard1: 0,
                iHard2: 0,
                clay1: 0,
                clay2: 0,
                grass1: 0,
                grass2: 0,
                totalAces1: 0,
                totalAces2: 0,
                totalDF1: 0,
                totalDF2: 0,
                doubleFaults1: 0,
                doubleFaults2: 0,
                firstServe1: 0,
                firstServe2: 0,
                firstServeOf1: 0,
                firstServeOf2: 0,
                winningOnFirstServe1: 0,
                winningOnFirstServe2: 0,
                winningOnFirstServeOf1: 0,
                winningOnFirstServeOf2: 0,
                winningOnSecondServe1: 0,
                winningOnSecondServe2: 0,
                winningOnSecondServeOf1: 0,
                winningOnSecondServeOf2: 0,
                breakPointsConverted1: 0,
                breakPointsConvertedOf1: 0,
                breakPointsConverted2: 0,
                breakPointsConvertedOf2: 0,
                totalPointsWon1: 0,
                totalPointsWon2: 0,
                firstServePercentage1: 0,
                firstServePercentage2: 0,
                winningOnFirstServePercentage1: 0,
                winningOnFirstServePercentage2: 0,
                winningOnSecondServePercentage1: 0,
                winningOnSecondServePercentage2: 0,
                slam1: 0,
                slam2: 0,
                master1: 0,
                master2: 0,
                main1: 0,
                main2: 0,
                tourFinals1: 0,
                tourFinals2: 0,
                title1: 0,
                title2: 0,
                cup1: 0,
                cup2: 0,
                future1: 0,
                future2: 0,
                challengers1: 0,
                challengers2: 0,
                doubleFaultsCount1: 0,
                doubleFaultsCount2: 0,
                acesCount1: 0,
                acesCount2: 0,
                returnPtsWin1: 0,
                returnPtsWin2: 0,
                returnPtsWinOf1: 0,
                returnPtsWinOf2: 0,
                returnPtsWinPercentage1: 0,
                returnPtsWinPercentage2: 0,
                breakpointsWonPercentage1: 0,
                breakpointsWonPercentage2: 0,
                bestOfThreeWon1: 0,
                bestOfThreeWonPercentage1: 0,
                bestOfThreeWon2: 0,
                bestOfThreeWonPercentage2: 0,
                bestOfFiveWon1: 0,
                bestOfFiveWonPercentage1: 0,
                bestOfFiveWon2: 0,
                bestOfFiveWonPercentage2: 0,
                bestOfThreeCount: 0,
                bestOfFiveCount: 0,
                decidingSetWin1: 0,
                decidingSetWin2: 0,
                tiebreakWon1: 0,
                tiebreakWon2: 0,
                matchesWon1: 0,
                matchesWon2: 0,
                firstSetWinMatchWin1: 0,
                firstSetWinMatchWin2: 0,
                firstSetWinMatchLose1: 0,
                firstSetWinMatchLose2: 0,
                firstSetLoseMatchWin1: 0,
                firstSetLoseMatchWin2: 0,
                firstSetWinMatchWinPercentage1: 0,
                firstSetWinMatchWinPercentage2: 0,
                firstSetWinMatchLosePercentage1: 0,
                firstSetWinMatchLosePercentage2: 0,
                firstSetLoseMatchWinPercentage1: 0,
                firstSetLoseMatchWinPercentage2: 0,
                decidingSetWinPercentage1: 0,
                decidingSetWinPercentage2: 0,
                totalTBWinPercentage1: 0,
                totalTBWinPercentage2: 0,
                firstSetWinCount: 0,
                firstSetLoseCount: 0,
                matchesCount: await response.getCount(),
            };
            stats
                .map((stat) => {
                statMatchIds.push(stat.game_id);
                return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (0, utils_1.swapObjectValues)({
                    returnPtsWin1: stat.stat_rpw1,
                    returnPtsWin2: stat.stat_rpw2
                }, stat.stat_player1Id === player1Id)), (0, utils_1.swapObjectValues)({
                    returnPtsWinOf1: stat.stat_rpwOf1,
                    returnPtsWinOf2: stat.stat_rpwOf2
                }, stat.stat_player1Id === player1Id)), (0, utils_1.swapObjectValues)({
                    aces1: stat.stat_aces1,
                    aces2: stat.stat_aces2
                }, stat.stat_player1Id === player1Id)), (0, utils_1.swapObjectValues)({
                    doubleFaults1: stat.stat_doubleFaults1,
                    doubleFaults2: stat.stat_doubleFaults2,
                }, stat.stat_player1Id === player1Id)), (0, utils_1.swapObjectValues)({
                    firstServe1: stat.stat_firstServe1,
                    firstServe2: stat.stat_firstServe2
                }, stat.stat_player1Id === player1Id)), (0, utils_1.swapObjectValues)({
                    firstServeOf1: stat.stat_firstServeOf1,
                    firstServeOf2: stat.stat_firstServeOf2,
                }, stat.stat_player1Id === player1Id)), (0, utils_1.swapObjectValues)({
                    winningOnFirstServe1: stat.stat_winningOnFirstServe1,
                    winningOnFirstServe2: stat.stat_winningOnFirstServe2,
                }, stat.stat_player1Id === player1Id)), (0, utils_1.swapObjectValues)({
                    winningOnFirstServeOf1: stat.stat_winningOnFirstServeOf1,
                    winningOnFirstServeOf2: stat.stat_winningOnFirstServeOf2,
                }, stat.stat_player1Id === player1Id)), (0, utils_1.swapObjectValues)({
                    winningOnSecondServe1: stat.stat_winningOnSecondServe1,
                    winningOnSecondServe2: stat.stat_winningOnSecondServe2,
                }, stat.stat_player1Id === player1Id)), (0, utils_1.swapObjectValues)({
                    winningOnSecondServeOf1: stat.stat_winningOnSecondServeOf1,
                    winningOnSecondServeOf2: stat.stat_winningOnSecondServeOf2,
                }, stat.stat_player1Id === player1Id)), (0, utils_1.swapObjectValues)({
                    breakPointsConverted1: stat.stat_breakPointsConverted1,
                    breakPointsConverted2: stat.stat_breakPointsConverted2,
                }, stat.stat_player1Id === player1Id)), this.getAvgMatchTime(stat.stat_mt)), (0, utils_1.swapObjectValues)({
                    breakPointsConvertedOf1: stat.stat_breakPointsConvertedOf1,
                    breakPointsConvertedOf2: stat.stat_breakPointsConvertedOf2,
                }, stat.stat_player1Id === player1Id)), (0, utils_1.swapObjectValues)({
                    totalPointsWon1: stat.stat_totalPointsWon1,
                    totalPointsWon2: stat.stat_totalPointsWon2,
                }, stat.stat_player1Id === player1Id)), this.getAvgMatchTime(stat.stat_mt)), this.getCourtStat(stat.tournament_court_id, stat.stat_player1Id === player1Id)), this.getTournamentRank(stat.tournament_rank_id, stat.round_id, stat.stat_player1Id === player1Id)), this.getGamesData(stat.game_result, stat.stat_player1Id === player1Id)), this.getDecidingSetStat(stat.game_result, stat.stat_player1Id === player1Id)), this.getSetsWon(stat.game_result, stat.stat_player1Id === player1Id)), this.getTiebreaksWon(stat.game_result, stat.stat_player1Id === player1Id)), this.getBestOfStat(stat.game_result, stat.stat_player1Id === player1Id)), this.getFirstSetWinMatchWin(stat.game_result, stat.stat_player1Id === player1Id)), this.getFirstSetWinMatchLose(stat.game_result, stat.stat_player1Id === player1Id)), this.getFirstSetLoseMatchWin(stat.game_result, stat.stat_player1Id === player1Id)), this.GetFirstSetWinLoseCount(stat.game_result, stat.stat_player1Id === player1Id));
            })
                .forEach((stat) => {
                result.returnPtsWin1 += (0, utils_1.fixNull)(stat.returnPtsWin1);
                result.returnPtsWin2 += (0, utils_1.fixNull)(stat.returnPtsWin2);
                result.returnPtsWinOf1 += (0, utils_1.fixNull)(stat.returnPtsWinOf1);
                result.returnPtsWinOf2 += (0, utils_1.fixNull)(stat.returnPtsWinOf2);
                result.totalAces1 += (0, utils_1.fixNull)(stat.aces1);
                result.totalAces2 += (0, utils_1.fixNull)(stat.aces2);
                result.doubleFaults1 += (0, utils_1.fixNull)(stat.doubleFaults1);
                result.doubleFaults2 += (0, utils_1.fixNull)(stat.doubleFaults2);
                result.firstServe1 += (0, utils_1.fixNull)(stat.firstServe1);
                result.firstServe2 += (0, utils_1.fixNull)(stat.firstServe2);
                result.firstServeOf1 += (0, utils_1.fixNull)(stat.firstServeOf1);
                result.firstServeOf2 += (0, utils_1.fixNull)(stat.firstServeOf2);
                result.winningOnFirstServe1 += (0, utils_1.fixNull)(stat.winningOnFirstServe1);
                result.winningOnFirstServe2 += (0, utils_1.fixNull)(stat.winningOnFirstServe2);
                result.winningOnFirstServeOf1 += (0, utils_1.fixNull)(stat.winningOnFirstServeOf1);
                result.winningOnFirstServeOf2 += (0, utils_1.fixNull)(stat.winningOnFirstServeOf2);
                result.winningOnSecondServe1 += (0, utils_1.fixNull)(stat.winningOnSecondServe1);
                result.winningOnSecondServe2 += (0, utils_1.fixNull)(stat.winningOnSecondServe2);
                result.winningOnSecondServeOf1 += (0, utils_1.fixNull)(stat.winningOnSecondServeOf1);
                result.winningOnSecondServeOf2 += (0, utils_1.fixNull)(stat.winningOnSecondServeOf2);
                result.breakPointsConverted1 += (0, utils_1.fixNull)(stat.breakPointsConverted1);
                result.breakPointsConverted2 += (0, utils_1.fixNull)(stat.breakPointsConverted2);
                result.breakPointsConvertedOf1 += (0, utils_1.fixNull)(stat.breakPointsConvertedOf1);
                result.breakPointsConvertedOf2 += (0, utils_1.fixNull)(stat.breakPointsConvertedOf2);
                result.totalPointsWon1 += (0, utils_1.fixNull)(stat.totalPointsWon1);
                result.totalPointsWon2 += (0, utils_1.fixNull)(stat.totalPointsWon2);
                result.avgTime1 += stat.avgTime1;
                result.avgTime2 += stat.avgTime2;
                result.hard1 += stat.hard1;
                result.hard2 += stat.hard2;
                result.clay1 += stat.clay1;
                result.clay2 += stat.clay2;
                result.iHard1 += stat.iHard1;
                result.iHard2 += stat.iHard2;
                result.grass1 += stat.grass1;
                result.grass2 += stat.grass2;
                result.slam1 += stat.slam1;
                result.slam2 += stat.slam2;
                result.master1 += stat.master1;
                result.master2 += stat.master2;
                result.main1 += stat.main1;
                result.main2 += stat.main2;
                result.cup1 += stat.cup1;
                result.cup2 += stat.cup2;
                result.future1 += stat.future1;
                result.future2 += stat.future2;
                result.challengers1 += stat.challengers1;
                result.challengers2 += stat.challengers2;
                result.title1 += stat.title1;
                result.title2 += stat.title2;
                result.bestOfThreeWon1 += stat.bestOfThreeWon1;
                result.bestOfThreeWon2 += stat.bestOfThreeWon2;
                result.bestOfFiveWon1 += stat.bestOfFiveWon1;
                result.bestOfFiveWon2 += stat.bestOfFiveWon2;
                result.bestOfThreeCount += stat.bestOfThreeWon1 + stat.bestOfThreeWon2,
                    result.bestOfFiveCount += stat.bestOfFiveWon1 + stat.bestOfFiveWon2,
                    result.setsWon1 += stat.setsWon1;
                result.setsWon2 += stat.setsWon2;
                result.decidingSetWin1 += stat.decidingSetWin1;
                result.decidingSetWin2 += stat.decidingSetWin2;
                result.tiebreakWon1 += stat.tiebreakWon1;
                result.tiebreakWon2 += stat.tiebreakWon2;
                result.gamesWon1 += stat.gamesWon1;
                result.gamesWon2 += stat.gamesWon2;
                result.gamesServed += stat.gamesServed;
                result.firstSetWinMatchWin1 += stat.firstSetWinMatchWin1;
                result.firstSetWinMatchWin2 += stat.firstSetWinMatchWin2;
                result.firstSetWinMatchLose1 += stat.firstSetWinMatchLose1;
                result.firstSetWinMatchLose2 += stat.firstSetWinMatchLose2;
                result.firstSetLoseMatchWin1 += stat.firstSetLoseMatchWin1;
                result.firstSetLoseMatchWin2 += stat.firstSetLoseMatchWin2;
                result.firstSetWinCount += stat.firstSetWinCount;
                result.firstSetLoseCount += stat.firstSetLoseCount;
            });
            const gamesResult = {
                gamesServed: 0,
                gamesWon1: 0,
                gamesWon2: 0,
                setsWon1: 0,
                setsWon2: 0,
                bestOfThreeWon1: 0,
                bestOfThreeWonPercentage1: 0,
                bestOfThreeWon2: 0,
                bestOfThreeWonPercentage2: 0,
                bestOfFiveWon1: 0,
                bestOfFiveWonPercentage1: 0,
                bestOfFiveWon2: 0,
                bestOfFiveWonPercentage2: 0,
                bestOfThreeCount: 0,
                bestOfFiveCount: 0,
            };
            if (allMatchesIds.length > statMatchIds.length) {
                const unique = allMatchesIds.filter(item => statMatchIds.indexOf(item) == -1);
                const filteredMatches = allMatches.filter(m => unique.includes(m.id));
                filteredMatches
                    .map(stat => {
                    return Object.assign(Object.assign(Object.assign({}, this.getGamesData(stat.result, stat.player1Id === player1Id)), this.getSetsWon(stat.result, stat.player1Id === player1Id)), this.getBestOfStat(stat.result, stat.player1Id === player1Id));
                })
                    .forEach((stat) => {
                    result.bestOfThreeWon1 += stat.bestOfThreeWon1;
                    result.bestOfThreeWon2 += stat.bestOfThreeWon2;
                    result.bestOfFiveWon1 += stat.bestOfFiveWon1;
                    result.bestOfFiveWon2 += stat.bestOfFiveWon2;
                    result.bestOfThreeCount += stat.bestOfThreeWon1 + stat.bestOfThreeWon2,
                        result.bestOfFiveCount += stat.bestOfFiveWon1 + stat.bestOfFiveWon2,
                        result.setsWon1 += stat.setsWon1;
                    result.setsWon2 += stat.setsWon2;
                    result.gamesWon1 += stat.gamesWon1;
                    result.gamesWon2 += stat.gamesWon2;
                    result.gamesServed += stat.gamesServed;
                });
            }
            const milliseconds1 = new Date(result.avgTime1 / result.matchesCount).getTime();
            const milliseconds2 = new Date(result.avgTime2 / result.matchesCount).getTime();
            const hours1 = Math.floor(milliseconds1 / 1000 / 60 / 60);
            const hours2 = Math.floor(milliseconds2 / 1000 / 60 / 60);
            const minutes1 = Math.floor(milliseconds1 / 1000 / 60) % 60;
            const minutes2 = Math.floor(milliseconds2 / 1000 / 60) % 60;
            const seconds1 = Math.floor(milliseconds1 / 1000) % 60;
            const seconds2 = Math.floor(milliseconds2 / 1000) % 60;
            const time1 = `${hours1}:${minutes1}:${seconds1}`;
            const time2 = `${hours2}:${minutes2}:${seconds2}`;
            const res = {
                matchesCount: result.matchesCount,
                player1: {
                    name: name1,
                    matchesWon: result.bestOfFiveWon1 + result.bestOfThreeWon1,
                    acesCount: result.totalAces1,
                    doubleFaultsCount: result.doubleFaults1,
                    avgTime: time1,
                    firstServe: result.firstServe1,
                    firstServeOf: result.firstServeOf1,
                    firstServePercentage: (0, utils_1.countPercentage)(result.firstServe1, result.firstServeOf1),
                    winningOnFirstServe: result.winningOnFirstServe1,
                    winningOnFirstServeOf: result.winningOnFirstServeOf1,
                    winningOnSecondServe: result.winningOnSecondServe1,
                    winningOnSecondServeOf: result.winningOnSecondServeOf1,
                    winningOnFirstServePercentage: (0, utils_1.countPercentage)(result.winningOnFirstServe1, result.winningOnFirstServeOf1),
                    winningOnSecondServePercentage: (0, utils_1.countPercentage)(result.winningOnSecondServe1, result.winningOnSecondServeOf1),
                    returnPtsWin: result.returnPtsWin1,
                    returnPtsWinOf: result.returnPtsWinOf1,
                    returnPtsWinPercentage: (0, utils_1.countPercentage)(result.returnPtsWin1, result.returnPtsWinOf1),
                    breakPointsConverted: result.breakPointsConverted1,
                    breakPointsConvertedOf: result.breakPointsConvertedOf1,
                    breakpointsWonPercentage: (0, utils_1.countPercentage)(result.breakPointsConverted1, result.breakPointsConvertedOf1),
                    bestOfThreeWon: (result.bestOfThreeWon1 + gamesResult.bestOfThreeWon1),
                    bestOfThreeWonPercentage: (0, utils_1.countPercentage)((result.bestOfThreeWon1 + gamesResult.bestOfThreeWon1), (result.bestOfThreeCount + gamesResult.bestOfThreeCount)),
                    bestOfThreeCount: (result.bestOfThreeCount + gamesResult.bestOfThreeCount),
                    bestOfFiveWon: (result.bestOfFiveWon1 + gamesResult.bestOfFiveWon1),
                    bestOfFiveWonPercentage: (0, utils_1.countPercentage)((result.bestOfFiveWon1 + gamesResult.bestOfFiveWon1), (result.bestOfFiveCount + gamesResult.bestOfFiveCount)),
                    bestOfFiveCount: (result.bestOfFiveCount + gamesResult.bestOfFiveCount),
                    firstSetWinMatchWin: result.firstSetWinMatchWin1,
                    firstSetWinMatchWinPercentage: (0, utils_1.countPercentage)(result.firstSetWinMatchWin1, result.firstSetWinCount),
                    firstSetWinMatchLose: result.firstSetWinMatchLose1,
                    firstSetWinMatchLosePercentage: (0, utils_1.countPercentage)(result.firstSetWinMatchLose1, result.firstSetWinCount),
                    firstSetLoseMatchWin: result.firstSetLoseMatchWin1,
                    firstSetLoseMatchWinPercentage: (0, utils_1.countPercentage)(result.firstSetLoseMatchWin1, result.firstSetLoseCount),
                    firstSetWinCount: result.firstSetWinCount,
                    firstSetLoseCount: result.firstSetLoseCount,
                    decidingSetWin: result.decidingSetWin1,
                    decidingSetCount: result.decidingSetWin1 + result.decidingSetWin2,
                    decidingSetWinPercentage: (0, utils_1.countPercentage)(result.decidingSetWin1, result.decidingSetWin1 + result.decidingSetWin2),
                    tiebreakWon: result.tiebreakWon1,
                    tiebreakCount: result.tiebreakWon1 + result.tiebreakWon2,
                    totalTBWinPercentage: (0, utils_1.countPercentage)(result.tiebreakWon1, result.tiebreakWon1 + result.tiebreakWon2),
                    setsWon: (result.setsWon1 + gamesResult.setsWon1),
                    gamesWon: (result.gamesWon1 + gamesResult.gamesWon1),
                    title: result.title1,
                    grandSlam: result.slam1,
                    masters: result.master1,
                    mainTour: result.main1,
                    tourFinals: result.tourFinals1,
                    cups: result.cup1,
                    futures: result.future1,
                    challengers: result.challengers1,
                },
                player2: {
                    name: name2,
                    matchesWon: result.bestOfFiveWon2 + result.bestOfThreeWon2,
                    acesCount: result.totalAces2,
                    doubleFaultsCount: result.doubleFaults2,
                    avgTime: time2,
                    firstServe: result.firstServe2,
                    firstServeOf: result.firstServeOf2,
                    firstServePercentage: (0, utils_1.countPercentage)(result.firstServe2, result.firstServeOf2),
                    winningOnFirstServe: result.winningOnFirstServe2,
                    winningOnFirstServeOf: result.winningOnFirstServeOf2,
                    winningOnFirstServePercentage: (0, utils_1.countPercentage)(result.winningOnFirstServe2, result.winningOnFirstServeOf2),
                    winningOnSecondServe: result.winningOnSecondServe2,
                    winningOnSecondServeOf: result.winningOnSecondServeOf2,
                    winningOnSecondServePercentage: (0, utils_1.countPercentage)(result.winningOnSecondServe2, result.winningOnSecondServeOf2),
                    returnPtsWin: result.returnPtsWin2,
                    returnPtsWinOf: result.returnPtsWinOf2,
                    returnPtsWinPercentage: (0, utils_1.countPercentage)(result.returnPtsWin2, result.returnPtsWinOf2),
                    breakPointsConverted: result.breakPointsConverted2,
                    breakPointsConvertedOf: result.breakPointsConvertedOf2,
                    breakpointsWonPercentage: (0, utils_1.countPercentage)(result.breakPointsConverted2, result.breakPointsConvertedOf2),
                    bestOfThreeWon: (result.bestOfThreeWon2 + gamesResult.bestOfThreeWon2),
                    bestOfThreeWonPercentage: (0, utils_1.countPercentage)((result.bestOfThreeWon2 + gamesResult.bestOfThreeWon2), (result.bestOfThreeCount + gamesResult.bestOfThreeCount)),
                    bestOfThreeCount: (result.bestOfThreeCount + gamesResult.bestOfThreeCount),
                    bestOfFiveWon: (result.bestOfFiveWon2 + gamesResult.bestOfFiveWon2),
                    bestOfFiveWonPercentage: (0, utils_1.countPercentage)((result.bestOfFiveWon2 + gamesResult.bestOfFiveWon2), (result.bestOfFiveCount + gamesResult.bestOfFiveCount)),
                    bestOfFiveCount: (result.bestOfFiveCount + gamesResult.bestOfFiveCount),
                    firstSetWinMatchWin: result.firstSetWinMatchWin2,
                    firstSetWinMatchWinPercentage: (0, utils_1.countPercentage)(result.firstSetWinMatchWin2, result.firstSetLoseCount),
                    firstSetWinMatchLose: result.firstSetWinMatchLose2,
                    firstSetWinMatchLosePercentage: (0, utils_1.countPercentage)(result.firstSetWinMatchLose2, result.firstSetLoseCount),
                    firstSetLoseMatchWin: result.firstSetLoseMatchWin2,
                    firstSetLoseMatchWinPercentage: (0, utils_1.countPercentage)(result.firstSetLoseMatchWin2, result.firstSetWinCount),
                    firstSetWinCount: result.firstSetLoseCount,
                    firstSetLoseCount: result.firstSetWinCount,
                    decidingSetWin: result.decidingSetWin2,
                    decidingSetCount: result.decidingSetWin1 + result.decidingSetWin2,
                    decidingSetWinPercentage: (0, utils_1.countPercentage)(result.decidingSetWin2, result.decidingSetWin1 + result.decidingSetWin2),
                    tiebreakWon: result.tiebreakWon2,
                    tiebreakCount: result.tiebreakWon1 + result.tiebreakWon2,
                    totalTBWinPercentage: (0, utils_1.countPercentage)(result.tiebreakWon2, result.tiebreakWon1 + result.tiebreakWon2),
                    setsWon: (result.setsWon2 + gamesResult.setsWon2),
                    gamesWon: (result.gamesWon2 + gamesResult.gamesWon2),
                    title: result.title2,
                    grandSlam: result.slam2,
                    masters: result.master2,
                    mainTour: result.main2,
                    tourFinals: result.tourFinals2,
                    cups: result.cup2,
                    futures: result.future2,
                    challengers: result.challengers2,
                },
                surfaceData,
            };
            return res;
        });
    }
    async pvpMatchesPlayed(type, playerOne, playerTwo, query) {
        const gameRepo = type === tour_middleware_1.TourType.ATP ? this.gameAtpRepo : this.gameWtaRepo;
        const statTourType = type === tour_middleware_1.TourType.ATP ? 'StatAtp' : 'StatWta';
        let response = gameRepo
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.player1', 'winner')
            .leftJoinAndSelect('game.player2', 'loser')
            .leftJoinAndSelect('game.tournament', 'tour')
            .leftJoinAndMapOne('game.stats', `${statTourType}`, 'stats', '(stats.player1 = game.player1 and stats.player2 = game.player2 OR stats.player1 = game.player2 and stats.player2 = game.player1) and stats.tournament = tour.id')
            .where('(winner.name = :playerOne and loser.name = :playerTwo or loser.name = :playerOne and winner.name = :playerTwo)', {
            playerOne,
            playerTwo,
        });
        response = response.leftJoinAndSelect('tour.court', 'court');
        if (query === null || query === void 0 ? void 0 : query.court) {
            response = response.andWhere('LOWER(court.name) = LOWER(:courtFilter)', {
                courtFilter: query.court,
            });
        }
        if (query === null || query === void 0 ? void 0 : query.round) {
            response = response
                .leftJoinAndSelect('game.round', 'round')
                .andWhere('LOWER(round.name) = LOWER(:roundFilter)', {
                roundFilter: query.round,
            });
        }
        return response
            .orderBy('tour.date', 'DESC')
            .limit(10)
            .offset(10 * (((query === null || query === void 0 ? void 0 : query.page) || 1) - 1))
            .getMany()
            .then(async (games) => {
            if (games.length === 0) {
                throw new common_1.NotFoundException('No games');
            }
            const gamesMapped = games.map((game) => (Object.assign(Object.assign(Object.assign({}, game), { id: undefined, stats: undefined, odd1: undefined, odd2: undefined, seed1: undefined, seed2: undefined }), this.gameService.mapGameStats(type, game))));
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
    async findCurrentEventStats(type, player, player2) {
        const todayRepo = type === tour_middleware_1.TourType.ATP ? this.todayAtpRepo : this.todayWtaRepo;
        const tournamentRepo = type === tour_middleware_1.TourType.ATP ? this.tournamentAtpRepository : this.tournamentWtaRepository;
        const statTourType = type === tour_middleware_1.TourType.ATP ? 'StatAtp' : 'StatWta';
        let tournaments = await this.connection.query(`
    SELECT "tour"."id", "tour"."name", "p1"."name" as p1name, "p2"."name" as p2name
    FROM "tournament_atp" "tour" 
    INNER JOIN "today_atp" "today" ON "tour"."id" = today."tournamentId"  
    INNER JOIN "player_atp" "p1" ON "p1"."id" = today."player1Id" or "p1"."id" = today."player2Id"  
    INNER JOIN "player_atp" "p2" ON "p2"."id" = today."player1Id" or "p2"."id" = today."player2Id" 
    WHERE "p1"."name" like '%${player}%' AND "p2"."name" like '%${player2}%' 
    AND tour.rankId != 0 AND tour.rankId != 1 AND tour.rankId != 6 
    GROUP BY "tour"."id", "p1"."id", "p2"."id"`);
        if (tournaments.length == 0) {
            throw new common_1.NotFoundException(`No tournament for '${player}' vs '${player2}'`);
        }
        const response = todayRepo
            .createQueryBuilder('today')
            .leftJoin('today.player1', 'player1')
            .leftJoin('today.player2', 'player2')
            .leftJoin('today.tournament', 'tournament')
            .leftJoin('tournament.court', 'court')
            .addSelect([
            'player1.name',
            'player1.currentRank',
            'player2.name',
            'player2.currentRank',
            'tournament.name',
            'tournament.countryAcr',
            'court.name',
        ])
            .leftJoinAndMapOne('today.stat', `${statTourType}`, 'stat', "(stat.player1 = today.player1 and stat.player2 = today.player2 OR stat.player1 = today.player2 and stat.player2 = today.player1) and stat.tournament = tournament.id")
            .where('(player1.name = :player or player2.name = :player)', { player })
            .andWhere(`tournament.id = ${tournaments[0].id}`)
            .andWhere('today.result is not null')
            .andWhere('today.date is not null')
            .andWhere("today.result != ''")
            .orderBy('today.date', 'DESC');
        return response.getMany().then((matches) => {
            if (matches.length === 0) {
                throw new common_1.NotFoundException('No current event data');
            }
            if (matches.some((match) => match.stat === null)) {
                throw new common_1.NotFoundException("Some games don't have stats");
            }
            const result = Object.assign(Object.assign({}, matches[0]), { matchesPlayed: matches.length, id: matches[0].id, averageFirstServeSpeed: 0, averageSecondServeSpeed: 0, fastestServe: 0, gamesWon: 0, setsWon: 0, firstServe: 0, firstServeOf: 0, winningOnFirstServe: 0, winningOnFirstServe2: 0, winningOnFirstServeOf: 0, winningOnSecondServe: 0, winningOnSecondServe2: 0, winningOnSecondServeOf: 0, netApproaches1: 0, netApproaches1Of: 0, breakPointsConverted: 0, breakPointsConvertedOf: 0, breakPointsConverted2: 0, breakPointsConvertedOf2: 0, totalPointsWon: 0, breakpointsSaved: 0, unforcedErrors: 0, tiebreakWon: 0, matchesWon: 0, decidingSetWin: 0, firstSetWinMatchWin: 0, firstSetLoseMatchWin: 0, avgTime: 0, winsCountOnWin1: 0, winsCountOnWin2: 0, avgOpponentRank: 0 });
            matches
                .map((match) => {
                var _a, _b;
                if (!match.stat) {
                    return;
                }
                let p1Wins = 0;
                let p2Wins = 0;
                for (const set of match.result.split(' ')) {
                    p1Wins += parseInt((_a = set.split('-')[0]) === null || _a === void 0 ? void 0 : _a.split('(')[0]) || 0;
                    p2Wins += parseInt((_b = set.split('-')[1]) === null || _b === void 0 ? void 0 : _b.split('(')[0]) || 0;
                }
                return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (0, utils_1.swapObjectValues)({
                    breakPointsConverted1: match.stat.breakPointsConverted1,
                    breakPointsConverted2: match.stat.breakPointsConverted2,
                }, match.player1.name === player)), (0, utils_1.swapObjectValues)({
                    breakPointsConvertedOf1: match.stat.breakPointsConvertedOf1,
                    breakPointsConvertedOf2: match.stat.breakPointsConvertedOf2,
                }, match.player1.name === player)), (0, utils_1.swapObjectValues)({
                    totalPointsWon1: match.stat.totalPointsWon1,
                    totalPointsWon2: match.stat.totalPointsWon2,
                }, match.player1.name === player)), (0, utils_1.swapObjectValues)({
                    unforcedErrors1: match.stat.unforcedErrors1,
                    unforcedErrors2: match.stat.unforcedErrors2,
                }, match.player1.name === player)), (0, utils_1.swapObjectValues)({
                    fastestServe1: match.stat.fastestServe1,
                    fastestServe2: match.stat.fastestServe2,
                }, match.player1.name === player)), (0, utils_1.swapObjectValues)({
                    averageFirstServeSpeed1: match.stat.averageFirstServeSpeed1,
                    averageFirstServeSpeed2: match.stat.averageFirstServeSpeed2,
                }, match.player1.name === player)), (0, utils_1.swapObjectValues)({
                    averageSecondServeSpeed1: match.stat.averageSecondServeSpeed1,
                    averageSecondServeSpeed2: match.stat.averageSecondServeSpeed2,
                }, match.player1.name === player)), this.getGamesData(match.result, match.player1.name === player)), this.getDecidingSetStat(match.result, match.player1.name === player)), this.getSetsWon(match.result, match.player1.name === player)), this.getTiebreaksWon(match.result, match.player1.name === player)), this.getFirstSetWinMatchWin(match.result, match.player1.name === player)), this.getFirstSetLoseMatchWin(match.result, match.player1.name === player)), this.getAvgMatchTime(match.stat.mt)), (0, utils_1.swapObjectValues)({
                    winsCountOnWin1: p1Wins,
                    winsCountOnWin2: p2Wins,
                }, match.player1.name === player));
            })
                .forEach((stat) => {
                result.averageFirstServeSpeed += (0, utils_1.fixNull)(stat.averageFirstServeSpeed1);
                result.averageSecondServeSpeed += (0, utils_1.fixNull)(stat.averageSecondServeSpeed1);
                result.avgTime += (0, utils_1.fixNull)(stat.avgTime1);
                result.firstServe += (0, utils_1.fixNull)(stat.firstServe1);
                result.firstServeOf += (0, utils_1.fixNull)(stat.firstServeOf1);
                result.breakPointsConverted += (0, utils_1.fixNull)(stat.breakPointsConverted1);
                result.breakPointsConvertedOf += (0, utils_1.fixNull)(stat.breakPointsConvertedOf1);
                result.breakPointsConverted2 += (0, utils_1.fixNull)(stat.breakPointsConverted2);
                result.breakPointsConvertedOf2 += (0, utils_1.fixNull)(stat.breakPointsConvertedOf2);
                result.totalPointsWon += (0, utils_1.fixNull)(stat.totalPointsWon1);
                result.unforcedErrors += (0, utils_1.fixNull)(stat.unforcedErrors1);
                result.decidingSetWin += stat.decidingSetWin1;
                result.tiebreakWon += stat.tiebreakWon1;
                if (result.fastestServe < stat.fastestServe1) {
                    result.fastestServe = stat.fastestServe1;
                }
                result.winsCountOnWin1 = +stat.winsCountOnWin1;
                result.winsCountOnWin2 = +stat.winsCountOnWin2;
                result.avgOpponentRank = +stat.opponentRank2;
            });
            let hours1 = Math.floor(result.avgTime / 1000 / 60 / 60);
            let minutes1 = String(Math.floor(result.avgTime / 1000 / 60) % 60);
            let seconds1 = String(Math.floor(result.avgTime / 1000) % 60);
            if (Number(minutes1) < 10) {
                minutes1 = '0' + minutes1;
            }
            if (Number(seconds1) < 10) {
                seconds1 = '0' + seconds1;
            }
            const time1 = `${hours1}:${minutes1}:${seconds1}`;
            let lastGameTime = this.getAvgMatchTime(matches[0].stat.mt)['avgTime1'];
            hours1 = Math.floor(lastGameTime / 1000 / 60 / 60);
            minutes1 = String(Math.floor(lastGameTime / 1000 / 60) % 60);
            seconds1 = String(Math.floor(lastGameTime / 1000) % 60);
            if (Number(minutes1) < 10) {
                minutes1 = '0' + minutes1;
            }
            if (Number(seconds1) < 10) {
                seconds1 = '0' + seconds1;
            }
            let lastGameTimeStr = `${hours1}:${minutes1}:${seconds1}`;
            const response = {
                winsCountOnWin1: result.winsCountOnWin1,
                winsCountOnWin2: result.winsCountOnWin2,
                name: player,
                tourName: matches[0].tournament.name,
                country: matches[0].tournament.countryAcr,
                court: matches[0].tournament.court.name,
                averageFirstServeSpeed: result.averageFirstServeSpeed / matches.length,
                averageSecondServeSpeed: result.averageSecondServeSpeed / matches.length,
                fastestServe: result.fastestServe,
                lastMatchTime: lastGameTimeStr,
                totalTime: time1,
                matchesPlayed: matches.length,
                totalPointsWon: result.totalPointsWon,
                unforcedErrors: result.unforcedErrors,
                breakPointsSaved: result.breakPointsConvertedOf2 - result.breakPointsConverted2,
                breakPointsSavedOf: result.breakPointsConvertedOf2,
                breakPointsSavedPercentage: (0, utils_1.countPercentage)(result.breakPointsConvertedOf2 - result.breakPointsConverted2, result.breakPointsConvertedOf2),
                serviceHold: result.winsCountOnWin1,
                serviceHoldOf: (result.winsCountOnWin1 + result.winsCountOnWin2),
                serviceHoldPercentage: (0, utils_1.countPercentage)(result.winsCountOnWin1, (result.winsCountOnWin1 + result.winsCountOnWin2)),
                oppHold: result.winsCountOnWin2,
                oppHoldOf: (result.winsCountOnWin1 + result.winsCountOnWin2),
                decidingSetWin: result.decidingSetWin,
                decidingSetWinPercentage: (0, utils_1.countPercentage)(result.decidingSetWin, matches.length),
                tiebreakWon: result.tiebreakWon,
                totalTBWinPercentage: (0, utils_1.countPercentage)(result.tiebreakWon, matches.length),
                avgOpponentRank: result.avgOpponentRank / matches.length
            };
            return response;
        });
    }
    async findPlayerRecentMatches(type, player, query) {
        const gameRepo = type === tour_middleware_1.TourType.ATP ? this.gameAtpRepo : this.gameWtaRepo;
        const statTourType = type === tour_middleware_1.TourType.ATP ? 'StatAtp' : 'StatWta';
        const h2hTourType = type === tour_middleware_1.TourType.ATP ? 'H2hAtp' : 'H2hWta';
        let response = gameRepo
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.player1', 'winner')
            .leftJoinAndSelect('game.player2', 'loser')
            .leftJoinAndSelect('game.tournament', 'tour')
            .leftJoinAndMapOne('game.stat', `${statTourType}`, 'stat', '(stat.player1 = game.player1 and stat.player2 = game.player2 OR stat.player1 = game.player2 and stat.player2 = game.player1) and stat.tournament = tour.id')
            .leftJoinAndMapOne('game.h2h', `${h2hTourType}`, 'h2h', '(h2h.player1 = game.player1 and h2h.player2 = game.player2)')
            .where('(winner.name = :player OR loser.name = :player)', { player })
            .andWhere('game.date is not null')
            .orderBy('game.date', 'DESC');
        if (query === null || query === void 0 ? void 0 : query.court) {
            response = response
                .leftJoin('tour.court', 'court')
                .andWhere('LOWER(court.name) = LOWER(:courtFilter)', {
                courtFilter: query.court,
            });
        }
        if (query === null || query === void 0 ? void 0 : query.year) {
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
        if (query === null || query === void 0 ? void 0 : query.round) {
            response = response
                .leftJoinAndSelect('game.round', 'round')
                .andWhere('LOWER(round.name) = LOWER(:roundFilter)', {
                roundFilter: query.round,
            });
        }
        return response
            .limit(10)
            .offset(10 * (((query === null || query === void 0 ? void 0 : query.page) || 1) - 1))
            .getMany()
            .then(async (games) => {
            return {
                name: player,
                count: await response.getCount(),
                games: games.map((game) => {
                    return Object.assign(Object.assign({}, game), { isWin: game.player1.name === player });
                }),
            };
        });
    }
    async findUpcomingMatch(type, playerOne, playerTwo) {
        const todayRepo = type === tour_middleware_1.TourType.ATP ? this.todayAtpRepo : this.todayWtaRepo;
        return todayRepo
            .createQueryBuilder('today')
            .leftJoin('today.player1', 'player1')
            .leftJoin('today.player2', 'player2')
            .leftJoin('today.round', 'round')
            .leftJoin('today.tournament', 'tournament')
            .leftJoin('tournament.court', 'court')
            .where('(player1.name = :playerOne and player2.name = :playerTwo) OR (player2.name = :playerOne and player1.name = :playerTwo)', { playerOne, playerTwo })
            .addSelect([
            'round.name',
            'player1.name',
            'player1.countryAcr',
            'player2.name',
            'player2.countryAcr',
            'tournament.name',
            'court.name',
        ])
            .andWhere('today.complete is null')
            .andWhere("today.result=''")
            .andWhere('today.live is null')
            .getOne();
    }
    async findBreakdownStats(type, name, query) {
        const statRepo = type === tour_middleware_1.TourType.ATP ? this.statAtpRepo : this.statWtaRepo;
        const playerRepo = type === tour_middleware_1.TourType.ATP ? this.playerAtpRepo : this.playerWtaRepo;
        const playerStatRepo = type === tour_middleware_1.TourType.ATP ? this.playerStatAtpRepo : this.playerStatWtaRepo;
        const player = await this.getPlayerByName(name, playerRepo);
        const playerId = player.id;
        const gameRepo = type === tour_middleware_1.TourType.ATP ? this.gameAtpRepo : this.gameWtaRepo;
        const surfaceData = await this.getSurfaceData(playerId, gameRepo, query);
        const ytdWL = await this.getYTDWL(playerId, gameRepo, query);
        let response = await statRepo
            .createQueryBuilder('stat')
            .leftJoin('stat.player1', 'winner')
            .leftJoin('stat.player2', 'loser')
            .addSelect([
            'winner.id',
            'winner.name',
            'loser.id',
            'loser.name',
            'winner.currentRank',
            'loser.currentRank',
        ])
            .leftJoinAndSelect('stat.tournament', 'tour')
            .leftJoinAndSelect('tour.court', 'court')
            .leftJoinAndSelect('tour.rank', 'rank')
            .leftJoinAndMapOne('stat.game', game_entity_1.GameAtp, 'game', "(game.player1 = stat.player1 and game.player2 = stat.player2 OR game.player1 = stat.player2 and game.player2 = stat.player1) and game.tournament = tour.id")
            .where('(winner.name = :name OR loser.name = :name)', { name })
            .andWhere('tour.rankId != 0')
            .andWhere('tour.rankId != 1')
            .andWhere('tour.rankId != 6')
            .andWhere('game.roundId != 0')
            .andWhere('game.roundId != 1')
            .andWhere('game.roundId != 2')
            .andWhere('game.roundId != 3')
            .andWhere('game.result is not null')
            .andWhere('game.date is not null')
            .andWhere("game.result != 'w/o'")
            .andWhere("game.result != 'bye'")
            .andWhere("game.result != ''")
            .andWhere("game.result != 'ret.'")
            .orderBy('tour.date', 'DESC');
        if (query === null || query === void 0 ? void 0 : query.court) {
            response = response.andWhere('LOWER(court.name) in (:...courtFilter)', {
                courtFilter: query.court.split(',').map((name) => name.toLowerCase()),
            });
        }
        if (query === null || query === void 0 ? void 0 : query.round) {
            response = response
                .leftJoinAndSelect('game.round', 'round')
                .andWhere('LOWER(round.name) = LOWER(:roundFilter)', {
                roundFilter: query.round,
            });
        }
        if (query === null || query === void 0 ? void 0 : query.level) {
            if (query.level == 3) {
                response = response.andWhere(`rank.id = :rankId and tour.name not like '%ATP Finals%'`, {
                    rankId: query.level,
                });
            }
            else {
                response = response.andWhere('rank.id = :rankId', {
                    rankId: query.level,
                });
            }
        }
        if (query === null || query === void 0 ? void 0 : query.year) {
            response = response.andWhere(`tour.date BETWEEN :year and :nextYear`, {
                year: `${query.year}-01-01`,
                nextYear: `${query.year}-12-31`,
            });
        }
        if (query === null || query === void 0 ? void 0 : query.tournament) {
            response = response.andWhere('tour.name = :tourName', {
                tourName: query.tournament,
            });
        }
        return response.getMany().then(async (stats) => {
            const result = {
                hard1: 0,
                hard2: 0,
                iHard1: 0,
                iHard2: 0,
                clay1: 0,
                clay2: 0,
                grass1: 0,
                grass2: 0,
                totalAces1: 0,
                totalAces2: 0,
                totalDF1: 0,
                totalDF2: 0,
                doubleFaults1: 0,
                doubleFaults2: 0,
                firstServe1: 0,
                firstServe2: 0,
                firstServeOf1: 0,
                firstServeOf2: 0,
                winningOnFirstServe1: 0,
                winningOnFirstServe2: 0,
                winningOnFirstServeOf1: 0,
                winningOnFirstServeOf2: 0,
                winningOnSecondServe1: 0,
                winningOnSecondServe2: 0,
                winningOnSecondServeOf1: 0,
                winningOnSecondServeOf2: 0,
                breakPointsConverted1: 0,
                breakPointsConvertedOf1: 0,
                breakPointsConverted2: 0,
                breakPointsConvertedOf2: 0,
                totalPointsWon: 0,
                rank: 0,
                gamesServed: 0,
                gamesWon1: 0,
                gamesWon2: 0,
                setsWon1: 0,
                setsWon2: 0,
                bestOfThreeWon1: 0,
                bestOfThreeWonPercentage1: 0,
                bestOfThreeWon2: 0,
                bestOfThreeWonPercentage2: 0,
                bestOfFiveWon1: 0,
                bestOfFiveWonPercentage1: 0,
                bestOfFiveWon2: 0,
                bestOfFiveWonPercentage2: 0,
                bestOfThreeCount: 0,
                bestOfFiveCount: 0,
                decidingSetWin1: 0,
                decidingSetWin2: 0,
                decidingSetWinPercentage1: 0,
                decidingSetWinPercentage2: 0,
                tiebreakWon1: 0,
                tiebreakWon2: 0,
                matchesWon1: 0,
                matchesWon2: 0,
                firstSetWinMatchWin1: 0,
                firstSetWinMatchWin2: 0,
                firstSetWinMatchLose1: 0,
                firstSetWinMatchLose2: 0,
                firstSetLoseMatchWin1: 0,
                firstSetLoseMatchWin2: 0,
                firstSetWinCount: 0,
                firstSetLoseCount: 0,
                returnPtsWin1: 0,
                returnPtsWin2: 0,
                returnPtsWinOf1: 0,
                returnPtsWinOf2: 0,
                returnPtsWinPercentage1: 0,
                returnPtsWinPercentage2: 0,
                matchesCount: await response.getCount(),
                avgTime1: 0,
                avgTime2: 0,
                totalDoubleFaultsCount: 0,
            };
            stats
                .map((stat) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (0, utils_1.swapObjectValues)({
                    returnPtsWin1: stat.rpw1,
                    returnPtsWin2: stat.rpw2
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    returnPtsWinOf1: stat.rpwOf1,
                    returnPtsWinOf2: stat.rpwOf2
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    aces1: stat.aces1,
                    aces2: stat.aces2
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    rank1: stat.player1.currentRank,
                    rank2: stat.player2.currentRank,
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    doubleFaults1: stat.doubleFaults1,
                    doubleFaults2: stat.doubleFaults2,
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({ firstServe1: stat.firstServe1, firstServe2: stat.firstServe2 }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    firstServeOf1: stat.firstServeOf1,
                    firstServeOf2: stat.firstServeOf2,
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    winningOnFirstServe1: stat.winningOnFirstServe1,
                    winningOnFirstServe2: stat.winningOnFirstServe2,
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    winningOnFirstServeOf1: stat.winningOnFirstServeOf1,
                    winningOnFirstServeOf2: stat.winningOnFirstServeOf2,
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    winningOnSecondServe1: stat.winningOnSecondServe1,
                    winningOnSecondServe2: stat.winningOnSecondServe2,
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    winningOnSecondServeOf1: stat.winningOnSecondServeOf1,
                    winningOnSecondServeOf2: stat.winningOnSecondServeOf2,
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    breakPointsConverted1: stat.breakPointsConverted1,
                    breakPointsConverted2: stat.breakPointsConverted2,
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    breakPointsConvertedOf1: stat.breakPointsConvertedOf1,
                    breakPointsConvertedOf2: stat.breakPointsConvertedOf2,
                }, stat.player1.id === playerId)), (0, utils_1.swapObjectValues)({
                    totalPointsWon1: stat.totalPointsWon1,
                    totalPointsWon2: stat.totalPointsWon2,
                }, stat.player1.id === playerId)), this.getGamesData((_a = stat === null || stat === void 0 ? void 0 : stat.game) === null || _a === void 0 ? void 0 : _a.result, stat.player1.id === playerId)), this.getDecidingSetStat((_b = stat === null || stat === void 0 ? void 0 : stat.game) === null || _b === void 0 ? void 0 : _b.result, stat.player1.id === playerId)), this.getSetsWon((_c = stat === null || stat === void 0 ? void 0 : stat.game) === null || _c === void 0 ? void 0 : _c.result, stat.player1.id === playerId)), this.getTiebreaksWon((_d = stat === null || stat === void 0 ? void 0 : stat.game) === null || _d === void 0 ? void 0 : _d.result, stat.player1.id === playerId)), this.getBestOfStat((_e = stat === null || stat === void 0 ? void 0 : stat.game) === null || _e === void 0 ? void 0 : _e.result, stat.player1.id === playerId)), this.getFirstSetWinMatchWin((_f = stat === null || stat === void 0 ? void 0 : stat.game) === null || _f === void 0 ? void 0 : _f.result, stat.player1.id === playerId)), this.getFirstSetWinMatchLose((_g = stat === null || stat === void 0 ? void 0 : stat.game) === null || _g === void 0 ? void 0 : _g.result, stat.player1.id === playerId)), this.getFirstSetLoseMatchWin((_h = stat === null || stat === void 0 ? void 0 : stat.game) === null || _h === void 0 ? void 0 : _h.result, stat.player1.id === playerId)), this.getAvgMatchTime(stat.mt)), this.GetFirstSetWinLoseCount(stat.game.result, stat.player1.id === playerId));
            })
                .forEach((stat) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                result.returnPtsWin1 += (0, utils_1.fixNull)(stat.returnPtsWin1);
                result.returnPtsWin2 += (0, utils_1.fixNull)(stat.returnPtsWin2);
                result.returnPtsWinOf1 += (0, utils_1.fixNull)(stat.returnPtsWinOf1);
                result.returnPtsWinOf2 += (0, utils_1.fixNull)(stat.returnPtsWinOf2);
                result.totalAces1 += (0, utils_1.fixNull)(stat.aces1);
                result.totalAces2 += (0, utils_1.fixNull)(stat.aces2);
                result.totalDF1 += (0, utils_1.fixNull)(stat.doubleFaults1);
                result.totalDF2 += (0, utils_1.fixNull)(stat.doubleFaults2);
                result.firstServe1 += (0, utils_1.fixNull)(stat.firstServe1);
                result.firstServe2 += (0, utils_1.fixNull)(stat.firstServe2);
                result.firstServeOf1 += (0, utils_1.fixNull)(stat.firstServeOf1);
                result.firstServeOf2 += (0, utils_1.fixNull)(stat.firstServeOf2);
                result.rank += (0, utils_1.fixNull)(stat.rank2);
                result.winningOnFirstServe1 += (0, utils_1.fixNull)(stat.winningOnFirstServe1);
                result.winningOnFirstServe2 += (0, utils_1.fixNull)(stat.winningOnFirstServe2);
                result.winningOnFirstServeOf1 += (0, utils_1.fixNull)(stat.winningOnFirstServeOf1);
                result.winningOnFirstServeOf2 += (0, utils_1.fixNull)(stat.winningOnFirstServeOf2);
                result.winningOnSecondServe1 += (0, utils_1.fixNull)(stat.winningOnSecondServe1);
                result.winningOnSecondServe2 += (0, utils_1.fixNull)(stat.winningOnSecondServe2);
                result.winningOnSecondServeOf1 += (0, utils_1.fixNull)(stat.winningOnSecondServeOf1);
                result.winningOnSecondServeOf2 += (0, utils_1.fixNull)(stat.winningOnSecondServeOf2);
                result.breakPointsConverted1 += (0, utils_1.fixNull)(stat.breakPointsConverted1);
                result.breakPointsConverted2 += (0, utils_1.fixNull)(stat.breakPointsConverted2);
                result.breakPointsConvertedOf1 += (0, utils_1.fixNull)(stat.breakPointsConvertedOf1);
                result.breakPointsConvertedOf2 += (0, utils_1.fixNull)(stat.breakPointsConvertedOf2);
                result.totalPointsWon += (0, utils_1.fixNull)(stat.totalPointsWon1);
                result.bestOfThreeWon1 += stat.bestOfThreeWon1;
                result.bestOfThreeWon2 += stat.bestOfThreeWon2;
                result.bestOfFiveWon1 += stat.bestOfFiveWon1;
                result.bestOfFiveWon2 += stat.bestOfFiveWon2;
                result.bestOfThreeCount += stat.bestOfThreeWon1 + stat.bestOfThreeWon2,
                    result.bestOfFiveCount += stat.bestOfFiveWon1 + stat.bestOfFiveWon2,
                    result.setsWon1 += stat.setsWon1;
                result.setsWon2 += stat.setsWon2;
                result.decidingSetWin1 += stat.decidingSetWin1;
                result.decidingSetWin2 += stat.decidingSetWin2;
                result.tiebreakWon1 += stat.tiebreakWon1;
                result.tiebreakWon2 += stat.tiebreakWon2;
                result.hard1 += (_a = stat.hard1) !== null && _a !== void 0 ? _a : 0;
                result.hard2 += (_b = stat.hard2) !== null && _b !== void 0 ? _b : 0;
                result.clay1 += (_c = stat.clay1) !== null && _c !== void 0 ? _c : 0;
                result.clay2 += (_d = stat.clay2) !== null && _d !== void 0 ? _d : 0;
                result.iHard1 += (_e = stat.iHard1) !== null && _e !== void 0 ? _e : 0;
                result.iHard2 += (_f = stat.iHard2) !== null && _f !== void 0 ? _f : 0;
                result.grass1 += (_g = stat.grass1) !== null && _g !== void 0 ? _g : 0;
                result.grass2 += (_h = stat.grass2) !== null && _h !== void 0 ? _h : 0;
                result.gamesWon1 += (_j = stat.gamesWon1) !== null && _j !== void 0 ? _j : 0;
                result.gamesWon2 += (_k = stat.gamesWon2) !== null && _k !== void 0 ? _k : 0;
                result.gamesServed += (_l = stat.gamesServed) !== null && _l !== void 0 ? _l : 0;
                result.firstSetWinMatchWin1 += stat.firstSetWinMatchWin1;
                result.firstSetWinMatchWin2 += stat.firstSetWinMatchWin2;
                result.firstSetWinMatchLose1 += stat.firstSetWinMatchLose1;
                result.firstSetWinMatchLose2 += stat.firstSetWinMatchLose2;
                result.firstSetLoseMatchWin1 += stat.firstSetLoseMatchWin1;
                result.firstSetLoseMatchWin2 += stat.firstSetLoseMatchWin2;
                result.firstSetWinCount += stat.firstSetWinCount;
                result.firstSetLoseCount += stat.firstSetLoseCount;
                result.avgTime1 += stat.avgTime1;
                result.avgTime2 += stat.avgTime2;
            });
            result.matchesWon1 = result.bestOfFiveWon1 + result.bestOfThreeWon1;
            result.matchesWon2 = result.bestOfFiveWon2 + result.bestOfThreeWon2;
            const milliseconds1 = new Date(result.avgTime1 / result.matchesCount).getTime();
            const milliseconds2 = new Date(result.avgTime2 / result.matchesCount).getTime();
            const hours1 = Math.floor(milliseconds1 / 1000 / 60 / 60);
            const hours2 = Math.floor(milliseconds2 / 1000 / 60 / 60);
            const minutes1 = Math.floor(milliseconds1 / 1000 / 60) % 60;
            const minutes2 = Math.floor(milliseconds2 / 1000 / 60) % 60;
            const seconds1 = Math.floor(milliseconds1 / 1000) % 60;
            const seconds2 = Math.floor(milliseconds2 / 1000) % 60;
            const time1 = (hours1 && minutes1 && seconds1) ? `${hours1}:${minutes1}:${seconds1}` : 'N/A';
            const time2 = (hours2 && minutes2 && seconds2) ? `${hours2}:${minutes2}:${seconds2}` : 'N/A';
            const res = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, await this.getMatchesData(playerId, gameRepo, query)), { matchesCount: result.matchesCount, name, avgTime1: time1, avgTime2: time2, matchesWon1: result.matchesWon1, matchesWon2: result.matchesWon2, gamesWon1: result.gamesWon1, gamesWon2: result.gamesWon2, totalPointsWon: result.totalPointsWon, setsWon1: result.setsWon1, setsWon2: result.setsWon2 }), surfaceData), { aces: (0, utils_1.divideNumbers)(result.totalAces1, result.gamesServed), acesTotal: result.totalAces1, doubleFaultsCount: (0, utils_1.divideNumbers)(result.totalDF1, result.gamesServed), firstServe: result.firstServe1, firstServeOf: result.firstServeOf1, firstServePercentage: (0, utils_1.countPercentage)(result.firstServe1, result.firstServeOf1), winningOnFirstServe: result.winningOnFirstServe1, winningOnFirstServeOf: result.winningOnFirstServeOf1, winningOnFirstServePercentage: (0, utils_1.countPercentage)(result.winningOnFirstServe1, result.winningOnFirstServeOf1), winningOnSecondServe: result.winningOnSecondServe1, winningOnSecondServeOf: result.winningOnSecondServeOf1, winningOnSecondServePercentage: (0, utils_1.countPercentage)(result.winningOnSecondServe1, result.winningOnSecondServeOf1), returnPtsWin: result.returnPtsWin1, returnPtsWinOf: result.returnPtsWinOf1, returnPtsWinPercentage: (0, utils_1.countPercentage)(result.returnPtsWin1, result.returnPtsWinOf1), breakPointsConverted: result.breakPointsConverted1, breakPointsConvertedOf: result.breakPointsConvertedOf1, breakpointsWonPercentage: (0, utils_1.countPercentage)(result.breakPointsConverted1, result.breakPointsConvertedOf1), bestOfThreeWon: result.bestOfThreeWon1, bestOfThreeWonPercentage: (0, utils_1.countPercentage)(result.bestOfThreeWon1, result.bestOfThreeCount), bestOfThreeCount: result.bestOfThreeCount, bestOfFiveWon: result.bestOfFiveWon1, bestOfFiveWonPercentage: (0, utils_1.countPercentage)(result.bestOfFiveWon1, result.bestOfFiveCount), bestOfFiveCount: result.bestOfFiveCount, firstSetWinMatchWin: result.firstSetWinMatchWin1, firstSetWinMatchWinPercentage: (0, utils_1.countPercentage)(result.firstSetWinMatchWin1, result.firstSetWinCount), firstSetWinMatchLose: result.firstSetWinMatchLose1, firstSetWinMatchLosePercentage: (0, utils_1.countPercentage)(result.firstSetWinMatchLose1, result.firstSetWinCount), firstSetLoseMatchWin: result.firstSetLoseMatchWin1, firstSetLoseMatchWinPercentage: (0, utils_1.countPercentage)(result.firstSetLoseMatchWin1, result.firstSetLoseCount), firstSetWinCount: result.firstSetWinCount, firstSetLoseCount: result.firstSetLoseCount, decidingSetWin: result.decidingSetWin1, decidingSetCount: result.decidingSetWin1 + result.decidingSetWin2, decidingSetWinPercentage: (0, utils_1.countPercentage)(result.decidingSetWin1, result.decidingSetWin1 + result.decidingSetWin2), tiebreakWon: result.tiebreakWon1, tiebreakCount: result.tiebreakWon1 + result.tiebreakWon2, totalTBWinPercentage: (0, utils_1.countPercentage)(result.tiebreakWon1, result.tiebreakWon1 + result.tiebreakWon2), avgOppRank: (0, utils_1.divideNumbers)(result.rank, result.matchesCount) }), ytdWL), { totalDoubleFaultsCount: result.totalDF1 });
            return res;
        });
    }
    async findFiltersVs(type, playerName1, playerName2) {
        let playerRepo = this.playerAtpRepo;
        let tournamentRepo = this.tournamentAtpRepository;
        let gameRepo = this.gameAtpRepo;
        if (type === tour_middleware_1.TourType.WTA) {
            playerRepo = this.playerWtaRepo;
            tournamentRepo = this.tournamentWtaRepository;
            gameRepo = this.gameWtaRepo;
        }
        const playerResult1 = await this.getPlayerByName(playerName1, playerRepo);
        const playerResult2 = await this.getPlayerByName(playerName2, playerRepo);
        return {
            courts: await this.courtRepository.find(),
            rounds: await this.getRounds(),
            level: await this.rankRepository.find(),
            tournaments: await tournamentRepo
                .createQueryBuilder('tournament')
                .select(['tournament.name', 'tournament.date'])
                .leftJoin('tournament.games', 'games')
                .where('(games.player1 = :player1Id or games.player2 = :player1Id) and (games.player1 = :player2Id or games.player2 = :player2Id)', {
                player1Id: playerResult1.id,
                player2Id: playerResult2.id,
            })
                .getMany()
                .then((tournaments) => tournaments.map((tournament) => ({
                name: tournament.name,
                date: new Date(tournament.date).getFullYear().toString(),
            }))),
            years: await gameRepo
                .createQueryBuilder('game')
                .where('(game.player1 = :player1Id or game.player2 = :player1Id) and (game.player1 = :player2Id or game.player2 = :player2Id)', {
                player1Id: playerResult1.id,
                player2Id: playerResult2.id,
            })
                .andWhere('game.date is not null')
                .select('EXTRACT(year from game.date)', 'year')
                .distinctOn(['year'])
                .orderBy('year', 'DESC')
                .getRawMany()
                .then((games) => games.map((game) => game.year).filter((game) => game)),
        };
    }
    async findFilters(type, playerName1, playerName2) {
        const playerResult1 = await this.getPlayerByName(playerName1, this.playerAtpRepo);
        const playerResult2 = await this.getPlayerByName(playerName2, this.playerAtpRepo);
        return {
            courts: await this.courtRepository.find(),
            rounds: await this.getRounds(),
            level: await this.rankRepository.find(),
            tournaments: await this.tournamentAtpRepository
                .createQueryBuilder('tournament')
                .select(['tournament.name', 'tournament.date'])
                .leftJoin('tournament.games', 'games')
                .where('(games.player1 = :player1Id or games.player2 = :player1Id) or (games.player1 = :player2Id or games.player2 = :player2Id)', {
                player1Id: playerResult1.id,
                player2Id: playerResult2.id,
            })
                .getMany()
                .then((tournaments) => tournaments.map((tournament) => ({
                name: tournament.name,
                date: new Date(tournament.date).getFullYear().toString(),
            }))),
            years: await this.gameAtpRepo
                .createQueryBuilder('game')
                .where('(game.player1 = :player1Id or game.player2 = :player1Id) or (game.player1 = :player2Id or game.player2 = :player2Id)', {
                player1Id: playerResult1.id,
                player2Id: playerResult2.id,
            })
                .andWhere('game.date is not null')
                .select('EXTRACT(year from game.date)', 'year')
                .distinctOn(['year'])
                .orderBy('year', 'DESC')
                .getRawMany()
                .then((games) => games.map((game) => game.year).filter((game) => game)),
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
    getSetsWon(score, isPlayerOneWon) {
        const result = {
            setsWon1: 0,
            setsWon2: 0,
        };
        if (!score)
            return result;
        let temp;
        const arr = score.split(' ').map((a) => a.split('-'));
        for (let i = 0; i < arr.length; i++) {
            if (!isNaN(parseInt(arr[i][0])) && !arr[i][0].includes('ret')) {
                if (parseInt(arr[i][0]) > parseInt(arr[i][1])) {
                    result.setsWon1++;
                }
                if (parseInt(arr[i][0]) < parseInt(arr[i][1])) {
                    result.setsWon2++;
                }
            }
        }
        if (!isPlayerOneWon) {
            temp = result.setsWon1;
            result.setsWon1 = result.setsWon2;
            result.setsWon2 = temp;
        }
        return result;
    }
    getTiebreaksWon(score, isPlayerOneWon) {
        const result = {
            tiebreakWon1: 0,
            tiebreakWon2: 0,
        };
        if (!score)
            return result;
        const arr = score.split(' ').map((a) => a.split('-'));
        for (let i = 0; i < arr.length; i++) {
            if (!isNaN(parseInt(arr[i][0])) && arr[i][1].includes('(')) {
                if ((arr[i][0] > arr[i][1]) && isPlayerOneWon) {
                    result.tiebreakWon1++;
                }
                else if (((arr[i][0] > arr[i][1]) && !isPlayerOneWon)) {
                    result.tiebreakWon2++;
                }
                else if ((arr[i][0] < arr[i][1]) && isPlayerOneWon) {
                    result.tiebreakWon2++;
                }
            }
        }
        return result;
    }
    getBestOfStat(score, isPlayerOneWon) {
        const result = {
            bestOfThreeWon1: 0,
            bestOfThreeWon2: 0,
            bestOfFiveWon1: 0,
            bestOfFiveWon2: 0,
        };
        let player1Wins = 0;
        if (!score)
            return result;
        const arr = score.split(' ').map((a) => a.split('-'));
        for (let i = 0; i < arr.length; i++) {
            if (!isNaN(parseInt(arr[i][0]))) {
                parseInt(arr[i][0]) > parseInt(arr[i][1]) && player1Wins++;
            }
        }
        if (arr.length < 4 && player1Wins != 3) {
            if (player1Wins >= 2) {
                isPlayerOneWon ? result.bestOfThreeWon1++ : result.bestOfThreeWon2++;
                return result;
            }
        }
        else {
            isPlayerOneWon ? result.bestOfFiveWon1++ : result.bestOfFiveWon2++;
            return result;
        }
        return result;
    }
    getDecidingSetStat(score, isPlayerOneWon) {
        const result = {
            decidingSetWin1: 0,
            decidingSetWin2: 0,
        };
        let player2Wins = 0;
        if (!score)
            return result;
        const arr = score.split(' ').map((a) => a.split('-'));
        for (let i = 0; i < arr.length; i++) {
            if (!isNaN(parseInt(arr[i][0]))) {
                parseInt(arr[i][0]) < parseInt(arr[i][1]) && player2Wins++;
            }
        }
        if (player2Wins === 2 && arr.length == 5) {
            isPlayerOneWon ? result.decidingSetWin1++ : result.decidingSetWin2++;
            return result;
        }
        if (player2Wins === 1 && arr.length == 3) {
            isPlayerOneWon ? result.decidingSetWin1++ : result.decidingSetWin2++;
            return result;
        }
        return result;
    }
    getCourtStat(courtId, isPlayerOneWon) {
        const result = {
            hard1: 0,
            hard2: 0,
            iHard1: 0,
            iHard2: 0,
            clay1: 0,
            clay2: 0,
            grass1: 0,
            grass2: 0,
            total1: 0,
            total2: 0,
        };
        switch (courtId) {
            case 1:
                isPlayerOneWon ? result.hard1++ : result.hard2++;
                return result;
            case 2:
                isPlayerOneWon ? result.clay1++ : result.clay2++;
                return result;
            case 3:
                isPlayerOneWon ? result.iHard1++ : result.iHard2++;
                return result;
            case 4:
                isPlayerOneWon ? result.iHard1++ : result.iHard2++;
                return result;
            case 6:
                isPlayerOneWon ? result.iHard1++ : result.iHard2++;
                return result;
            case 5:
                isPlayerOneWon ? result.grass1++ : result.grass2++;
                return result;
            default:
                return result;
        }
    }
    getTournamentRank(rankId, roundId, isPlayerOneWon) {
        const result = {
            slam1: 0,
            slam2: 0,
            title1: 0,
            title2: 0,
            master1: 0,
            master2: 0,
            main1: 0,
            main2: 0,
            cup1: 0,
            cup2: 0,
            future1: 0,
            future2: 0,
            challengers1: 0,
            challengers2: 0,
            tourFinals1: 0,
            tourFinals2: 0,
        };
        if ([0, 1, 2, 3].indexOf(roundId) == -1 && rankId == 2) {
            isPlayerOneWon ? result.main1++ : result.main2++;
        }
        if ([0, 1, 2, 3].indexOf(roundId) == -1 && rankId == 4) {
            isPlayerOneWon ? result.slam1++ : result.slam2++;
        }
        if ([0, 1, 2, 3].indexOf(roundId) == -1 && rankId == 5) {
            isPlayerOneWon ? result.cup1++ : result.cup2++;
        }
        if ([0, 1, 2, 3].indexOf(roundId) == -1 && rankId == 0) {
            isPlayerOneWon ? result.future1++ : result.future2++;
        }
        if ([0, 1, 2, 3].indexOf(roundId) == -1 && rankId == 1) {
            isPlayerOneWon ? result.challengers1++ : result.challengers2++;
        }
        if ([2, 3, 4, 7, 8, 9].indexOf(rankId) > -1 && roundId == 12) {
            isPlayerOneWon ? result.title1++ : result.title2++;
        }
        if ([0, 1, 2, 3].indexOf(roundId) == -1 && rankId == 3) {
            isPlayerOneWon ? result.master1++ : result.master2++;
        }
        if ([0, 1, 2, 3].indexOf(roundId) == -1 && rankId == 7) {
            isPlayerOneWon ? result.tourFinals1++ : result.tourFinals2++;
        }
        return result;
    }
    getGamesData(score, isPlayerOneWon) {
        const result = {
            gamesWon1: 0,
            gamesWon2: 0,
            gamesServed: 0,
        };
        if (!score)
            return result;
        const arr = score.split(' ').map((a) => a.split('-'));
        for (let i = 0; i < arr.length; i++) {
            if (!isNaN(parseInt(arr[i][0]))) {
                result.gamesWon1 += parseInt(arr[i][0]);
                result.gamesWon2 += parseInt(arr[i][1]);
            }
        }
        if (result.gamesWon1 === 0 && result.gamesWon2 === 0) {
            return result;
        }
        if (!isPlayerOneWon) {
            result.gamesWon1 = result.gamesWon1 ^ result.gamesWon2;
            result.gamesWon2 = result.gamesWon1 ^ result.gamesWon2;
            result.gamesWon1 = result.gamesWon1 ^ result.gamesWon2;
        }
        result.gamesServed = Math.floor((result.gamesWon1 + result.gamesWon2) / 2);
        return result;
    }
    getFirstSetWinMatchWin(score, isPlayerOneWon) {
        const result = {
            firstSetWinMatchWin1: 0,
            firstSetWinMatchWin2: 0,
        };
        const result2 = {
            setsWon1: 0,
            setsWon2: 0,
        };
        if (!score)
            return result;
        let temp;
        const arr = score.split(' ').map((a) => a.split('-'));
        for (let i = 0; i < arr.length; i++) {
            if (!isNaN(parseInt(arr[i][0])) && !arr[i][0].includes('ret')) {
                if (parseInt(arr[i][0]) > parseInt(arr[i][1])) {
                    result2.setsWon1++;
                }
                if (parseInt(arr[i][0]) < parseInt(arr[i][1])) {
                    result2.setsWon2++;
                }
            }
        }
        if (parseInt(arr[0][0]) > parseInt(arr[0][1]) && result2.setsWon1 > result2.setsWon2) {
            result.firstSetWinMatchWin1++;
        }
        if (parseInt(arr[0][0]) < parseInt(arr[0][1]) && result2.setsWon1 < result2.setsWon2) {
            result.firstSetWinMatchWin2++;
        }
        if (!isPlayerOneWon) {
            temp = result.firstSetWinMatchWin1;
            result.firstSetWinMatchWin1 = result.firstSetWinMatchWin2;
            result.firstSetWinMatchWin2 = temp;
        }
        return result;
    }
    getFirstSetWinMatchLose(score, isPlayerOneWon) {
        const result = {
            firstSetWinMatchLose1: 0,
            firstSetWinMatchLose2: 0,
        };
        const result2 = {
            setsWon1: 0,
            setsWon2: 0,
        };
        if (!score)
            return result;
        let temp;
        const arr = score.split(' ').map((a) => a.split('-'));
        for (let i = 0; i < arr.length; i++) {
            if (!isNaN(parseInt(arr[i][0])) && !arr[i][0].includes('ret')) {
                if (parseInt(arr[i][0]) > parseInt(arr[i][1])) {
                    result2.setsWon1++;
                }
                if (parseInt(arr[i][0]) < parseInt(arr[i][1])) {
                    result2.setsWon2++;
                }
            }
        }
        if (parseInt(arr[0][0]) > parseInt(arr[0][1]) && result2.setsWon1 < result2.setsWon2) {
            result.firstSetWinMatchLose1++;
        }
        if (parseInt(arr[0][0]) < parseInt(arr[0][1]) && result2.setsWon1 > result2.setsWon2) {
            result.firstSetWinMatchLose2++;
        }
        if (!isPlayerOneWon) {
            temp = result.firstSetWinMatchLose1;
            result.firstSetWinMatchLose1 = result.firstSetWinMatchLose2;
            result.firstSetWinMatchLose2 = temp;
        }
        return result;
    }
    getFirstSetLoseMatchWin(score, isPlayerOneWon) {
        const result = {
            firstSetLoseMatchWin1: 0,
            firstSetLoseMatchWin2: 0,
        };
        const result2 = {
            setsWon1: 0,
            setsWon2: 0,
        };
        if (!score)
            return result;
        let temp;
        const arr = score.split(' ').map((a) => a.split('-'));
        for (let i = 0; i < arr.length; i++) {
            if (!isNaN(parseInt(arr[i][0])) && !arr[i][0].includes('ret')) {
                if (parseInt(arr[i][0]) > parseInt(arr[i][1])) {
                    result2.setsWon1++;
                }
                if (parseInt(arr[i][0]) < parseInt(arr[i][1])) {
                    result2.setsWon2++;
                }
            }
        }
        if (parseInt(arr[0][0]) < parseInt(arr[0][1]) && result2.setsWon1 > result2.setsWon2) {
            result.firstSetLoseMatchWin1++;
        }
        if (parseInt(arr[0][0]) > parseInt(arr[0][1]) && result2.setsWon1 < result2.setsWon2) {
            result.firstSetLoseMatchWin2++;
        }
        if (!isPlayerOneWon) {
            temp = result.firstSetLoseMatchWin1;
            result.firstSetLoseMatchWin1 = result.firstSetLoseMatchWin2;
            result.firstSetLoseMatchWin2 = temp;
        }
        return result;
    }
    GetFirstSetWinLoseCount(score, isPlayerOneWon) {
        const result = {
            firstSetWinCount: 0,
            firstSetLoseCount: 0,
        };
        if (!score)
            return result;
        let temp;
        const arr = score.split(' ').map((a) => a.split('-'));
        if (!isNaN(parseInt(arr[0][0])) && !arr[0][0].includes('ret')) {
            if (parseInt(arr[0][0]) > parseInt(arr[0][1])) {
                result.firstSetWinCount++;
            }
            if (parseInt(arr[0][0]) < parseInt(arr[0][1])) {
                result.firstSetLoseCount++;
            }
        }
        if (!isPlayerOneWon) {
            temp = result.firstSetWinCount;
            result.firstSetWinCount = result.firstSetLoseCount;
            result.firstSetLoseCount = temp;
        }
        return result;
    }
    getAvgMatchTime(matchTime) {
        const result = {
            avgTime1: 0,
            avgTime2: 0,
        };
        if (!matchTime) {
            return result;
        }
        matchTime = matchTime.slice(11);
        const [hours, minutes, seconds] = matchTime
            .split(':')
            .map((v) => parseInt(v));
        const milliseconds = seconds * 1000 + minutes * 1000 * 60 + hours * 1000 * 60 * 60;
        result.avgTime1 += milliseconds;
        result.avgTime2 += milliseconds;
        return result;
    }
    recentGame(playerId, gameRepository) {
        return gameRepository
            .createQueryBuilder('game')
            .leftJoin('game.player1', 'player1')
            .leftJoin('game.player2', 'player2')
            .leftJoinAndSelect('game.tournament', 'tour')
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
    recentGameNoLimit(playerId, gameRepository) {
        return gameRepository
            .createQueryBuilder('game')
            .leftJoin('game.player1', 'player1')
            .leftJoin('game.player2', 'player2')
            .select([
            'game.id',
            'game.date',
            'player1.id',
            'player2.id',
            'player1.name',
            'player2.name',
        ])
            .where('(player1.id = :playerId or player2.id = :playerId) and game.date is not null', { playerId: playerId })
            .orderBy('game.date', 'DESC');
    }
    async getPlayerStat(playerId, playerStatRepo) {
        let response = await playerStatRepo
            .createQueryBuilder('stat')
            .where('stat.player = :playerId', { playerId })
            .getOne()
            .then(async (playerStat) => {
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
            for (const year in stat) {
                const levelByYear = stat[year].levelFinals;
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
            }
            return {
                maintourWin: mainTours.wins,
                maintourLose: mainTours.losses,
                finalsWin: tourFinals.wins,
                finalsLose: tourFinals.losses,
                masterWin: master.wins,
                masterLose: master.losses,
                slamWin: grandSlam.wins,
                slamLose: grandSlam.losses,
                cupsWin: cups.wins,
                cupsLose: cups.losses,
                futuresWin: futures.wins,
                futuresLose: futures.losses,
                challengersWin: challengers.wins,
                challengersLose: challengers.losses,
                totalWins: total.wins,
                totalLose: total.losses,
            };
        });
        return response;
    }
    getPlayerByName(name, playerRepository) {
        return playerRepository
            .createQueryBuilder('player')
            .leftJoin('player.information', 'info')
            .leftJoinAndSelect('player.country', 'country')
            .select([
            'player.id',
            'player.name',
            'player.birthday',
            'player.currentRank',
            'info.plays',
            'country.name',
            'country.acronym',
        ])
            .where('player.name = :requestName', { requestName: name })
            .getOne()
            .then((player) => {
            if (!player) {
                throw new common_1.NotFoundException('No such player');
            }
            return player;
        });
    }
    getSurfaceDataForTwo(player1Id, player2Id, gameRepo) {
        return gameRepo
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.tournament', 'tournament')
            .leftJoinAndSelect('tournament.court', 'court')
            .where('(game.player1 = :player1Id and game.player2 = :player2Id or game.player1 = :player2Id and game.player2 = :player1Id)', {
            player1Id,
            player2Id,
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
            .getMany()
            .then((games) => {
            const result = {
                hard1: 0,
                iHard1: 0,
                clay1: 0,
                grass1: 0,
                hard2: 0,
                iHard2: 0,
                clay2: 0,
                grass2: 0,
                total1: 0,
                total2: 0,
            };
            games
                .map((game) => {
                return this.getCourtStat(game.tournament.court.id, player1Id === game.player1Id);
            })
                .forEach((stat) => {
                result.hard1 += stat.hard1;
                result.clay1 += stat.clay1;
                result.iHard1 += stat.iHard1;
                result.grass1 += stat.grass1;
                result.hard2 += stat.hard2;
                result.clay2 += stat.clay2;
                result.iHard2 += stat.iHard2;
                result.grass2 += stat.grass2;
                result.total1 =
                    result.grass1 +
                        result.hard1 +
                        result.clay1 +
                        result.iHard1;
                result.total2 =
                    result.grass2 +
                        result.hard2 +
                        result.clay2 +
                        result.iHard2;
            });
            return result;
        });
    }
    async getMatchesData(player1Id, gameRepo, query) {
        let result = gameRepo
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.tournament', 'tournament')
            .leftJoinAndSelect('tournament.court', 'court')
            .where('(game.player1 = :player1Id or game.player2 = :player1Id)', {
            player1Id,
        })
            .andWhere('tournament.rankId != 0')
            .andWhere('tournament.rankId != 1')
            .andWhere('tournament.rankId != 6')
            .andWhere('game.roundId != 0')
            .andWhere('game.roundId != 1')
            .andWhere('game.roundId != 2')
            .andWhere('game.roundId != 3')
            .andWhere('game.result is not null')
            .andWhere('game.date is not null')
            .andWhere("game.result != 'w/o'")
            .andWhere("game.result != 'bye'")
            .andWhere("game.result != ''")
            .andWhere("game.result != 'ret.'")
            .orderBy('tournament.date', 'DESC');
        if (query === null || query === void 0 ? void 0 : query.court) {
            result = result.andWhere('LOWER(court.name) in (:...courtFilter)', {
                courtFilter: query.court.split(',').map((name) => name.toLowerCase()),
            });
        }
        if (query === null || query === void 0 ? void 0 : query.round) {
            result = result
                .leftJoin('game.round', 'round')
                .andWhere('LOWER(round.name) = LOWER(:roundFilter)', {
                roundFilter: query.round,
            });
        }
        if (query === null || query === void 0 ? void 0 : query.tournament) {
            result = result.andWhere('tournament.name = :tourName', {
                tourName: query.tournament,
            });
        }
        if (query === null || query === void 0 ? void 0 : query.year) {
            result = result.andWhere(`tournament.date BETWEEN :year and :nextYear`, {
                year: `${query.year}-01-01`,
                nextYear: `${query.year}-12-31`,
            });
        }
        let res = {
            slam1: 0,
            slam2: 0,
            title1: 0,
            title2: 0,
            master1: 0,
            master2: 0,
            main1: 0,
            main2: 0,
            cup1: 0,
            cup2: 0,
            future1: 0,
            future2: 0,
            challengers1: 0,
            challengers2: 0,
            tourFinals1: 0,
            tourFinals2: 0,
        };
        return await result
            .orderBy('game.date', 'DESC')
            .getMany()
            .then((games) => {
            games.forEach(game => {
                if ([0, 1, 2, 3].indexOf(game.roundId) == -1 && game.tournament.rankId == 2) {
                    player1Id == game.player1Id ? res.main1++ : res.main2++;
                }
                if ([0, 1, 2, 3].indexOf(game.roundId) == -1 && game.tournament.rankId == 4) {
                    player1Id == game.player1Id ? res.slam1++ : res.slam2++;
                }
                if ([0, 1, 2, 3].indexOf(game.roundId) == -1 && game.tournament.rankId == 5) {
                    player1Id == game.player1Id ? res.cup1++ : res.cup2++;
                }
                if ([0, 1, 2, 3].indexOf(game.roundId) == -1 && game.tournament.rankId == 0) {
                    player1Id == game.player1Id ? res.future1++ : res.future2++;
                }
                if ([0, 1, 2, 3].indexOf(game.roundId) == -1 && game.tournament.rankId == 1) {
                    player1Id == game.player1Id ? res.challengers1++ : res.challengers2++;
                }
                if ([2, 3, 4, 7, 8, 9].indexOf(game.tournament.rankId) > -1 && game.roundId == 12) {
                    player1Id == game.player1Id ? res.title1++ : res.title2++;
                }
                if ([0, 1, 2, 3].indexOf(game.roundId) == -1 && game.tournament.rankId == 3) {
                    player1Id == game.player1Id ? res.master1++ : res.master2++;
                }
                if ([0, 1, 2, 3].indexOf(game.roundId) == -1 && game.tournament.rankId == 7) {
                    player1Id == game.player1Id ? res.tourFinals1++ : res.tourFinals2++;
                }
            });
            return res;
        });
    }
    getSurfaceData(player1Id, gameRepo, query) {
        let result = gameRepo
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.tournament', 'tournament')
            .leftJoinAndSelect('tournament.court', 'court')
            .where('(game.player1 = :player1Id or game.player2 = :player1Id)', {
            player1Id,
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
            .andWhere("game.result != ''");
        if (query === null || query === void 0 ? void 0 : query.court) {
            result = result.andWhere('LOWER(court.name) in (:...courtFilter)', {
                courtFilter: query.court.split(',').map((name) => name.toLowerCase()),
            });
        }
        if (query === null || query === void 0 ? void 0 : query.round) {
            result = result
                .leftJoin('game.round', 'round')
                .andWhere('LOWER(round.name) = LOWER(:roundFilter)', {
                roundFilter: query.round,
            });
        }
        if (query === null || query === void 0 ? void 0 : query.tournament) {
            result = result.andWhere('tournament.name = :tourName', {
                tourName: query.tournament,
            });
        }
        if (query === null || query === void 0 ? void 0 : query.year) {
            result = result.andWhere(`tournament.date BETWEEN :year and :nextYear`, {
                year: `${query.year}-01-01`,
                nextYear: `${query.year}-12-31`,
            });
        }
        return result
            .orderBy('game.date', 'DESC')
            .getMany()
            .then((games) => {
            const result = {
                hard1: 0,
                iHard1: 0,
                clay1: 0,
                grass1: 0,
                hard2: 0,
                iHard2: 0,
                clay2: 0,
                grass2: 0,
                total1: 0,
                total2: 0,
            };
            games
                .map((game) => {
                return this.getCourtStat(game.tournament.court.id, player1Id === game.player1Id);
            })
                .forEach((stat) => {
                result.hard1 += stat.hard1;
                result.clay1 += stat.clay1;
                result.iHard1 += stat.iHard1;
                result.grass1 += stat.grass1;
                result.hard2 += stat.hard2;
                result.clay2 += stat.clay2;
                result.iHard2 += stat.iHard2;
                result.grass2 += stat.grass2;
            });
            result.total1 =
                result.total1 +
                    result.grass1 +
                    result.hard1 +
                    result.clay1 +
                    result.iHard1;
            result.total2 =
                result.total2 +
                    result.grass2 +
                    result.hard2 +
                    result.clay2 +
                    result.iHard2;
            return result;
        });
    }
    bestRank(id, ratingRepository) {
        return ratingRepository
            .createQueryBuilder('rating')
            .where('rating.player = :playerId', { playerId: id })
            .orderBy('rating.position')
            .getOne()
            .then((rating) => rating === null || rating === void 0 ? void 0 : rating.position);
    }
    currentRank(id, ratingRepository) {
        return ratingRepository
            .createQueryBuilder('rating')
            .where('rating.player = :playerId', { playerId: id })
            .orderBy('rating.date', 'DESC')
            .limit()
            .getOne()
            .then((rating) => rating === null || rating === void 0 ? void 0 : rating.position);
    }
    getYtdTitles(playerId, gameRepo, allTime = false) {
        let year = 1980;
        if (allTime == false) {
            year = new Date().getFullYear();
        }
        let currentYear = new Date().getFullYear();
        return gameRepo
            .createQueryBuilder('game')
            .where('game.roundId = 12')
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
            .andWhere('tournament.rankId != 0')
            .andWhere('tournament.rankId != 1')
            .andWhere('tournament.rankId != 6')
            .andWhere('game.roundId != 0')
            .andWhere('game.roundId != 1')
            .andWhere('game.roundId != 2')
            .andWhere('game.roundId != 3')
            .andWhere('game.result is not null')
            .andWhere('game.date is not null')
            .andWhere("game.result != 'w/o'")
            .andWhere("game.result != 'bye'")
            .andWhere("game.result != ''")
            .getCount();
    }
    getYTDWL(playerId, gameRepo, query) {
        let result = gameRepo
            .createQueryBuilder('game')
            .leftJoin('game.tournament', 'tour')
            .where('(game.player1 = :playerId or game.player2 = :playerId)', {
            playerId,
        })
            .andWhere('tour.rankId != 0')
            .andWhere('tour.rankId != 1')
            .andWhere('tour.rankId != 6')
            .andWhere('game.roundId != 0')
            .andWhere('game.roundId != 1')
            .andWhere('game.roundId != 2')
            .andWhere('game.roundId != 3')
            .andWhere('game.result is not null')
            .andWhere('game.date is not null')
            .andWhere("game.result != 'w/o'")
            .andWhere("game.result != 'bye'")
            .andWhere("game.result != ''");
        if (query === null || query === void 0 ? void 0 : query.court) {
            result = result
                .leftJoin('tour.court', 'court')
                .andWhere('LOWER(court.name) in (:...courtFilter)', {
                courtFilter: query.court.split(',').map((name) => name.toLowerCase()),
            });
        }
        if (query === null || query === void 0 ? void 0 : query.round) {
            result = result
                .leftJoin('game.round', 'round')
                .andWhere('LOWER(round.name) = LOWER(:roundFilter)', {
                roundFilter: query.round,
            });
        }
        if (query === null || query === void 0 ? void 0 : query.tournament) {
            result = result.andWhere('tour.name = :tourName', {
                tourName: query.tournament,
            });
        }
        if (query === null || query === void 0 ? void 0 : query.year) {
            result = result.andWhere(`tour.date BETWEEN :year and :nextYear`, {
                year: `${query.year}-01-01`,
                nextYear: `${query.year}-12-31`,
            });
        }
        if (query === undefined) {
            const date = new Date();
            let year = date.getFullYear();
            result = result.andWhere(`tour.date BETWEEN :year and :nextYear`, {
                year: `${year}-01-01`,
                nextYear: `${year}-12-31`,
            });
        }
        return result.getMany().then((games) => {
            let result = {
                win: 0,
                lose: 0,
            };
            games.forEach((game) => {
                game.player1Id == playerId ? result.win++ : result.lose++;
            });
            return {
                ytdWon: result.win,
                ytdLost: result.lose,
            };
        });
    }
    getCareerWL(playerId, gameRepo) {
        return gameRepo
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.tournament', 'tournament')
            .where('(game.player1 = :playerId or game.player2 = :playerId)', {
            playerId,
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
            .getMany()
            .then((games) => {
            const result = {
                careerWin: 0,
                careerLose: 0,
            };
            games.forEach((game) => game.player1Id == playerId ? result.careerWin++ : result.careerLose++);
            return result;
        });
    }
    careerMoney(playerId, gameRepository, type) {
        return gameRepository
            .createQueryBuilder('game')
            .select([
            'game.id',
            'game.roundId',
            'game.player1Id',
            'game.player2Id',
            'winner.name',
            'winner.id',
            'winner.countryAcr',
            'loser.name',
            'loser.id',
            'loser.countryAcr',
            'tournament.id',
            'tournament.singlesPrize',
        ])
            .where('(game.player1 = :playerId or game.player2 = :playerId)', {
            playerId,
        })
            .leftJoin('game.tournament', 'tournament')
            .leftJoin('game.player1', 'winner')
            .leftJoin('game.player2', 'loser')
            .leftJoinAndSelect('tournament.singlesPrize', 'singlesPrize')
            .andWhere('tournament.singlesPrizeId is not null')
            .andWhere("winner.name not like '%/%'")
            .getMany()
            .then((games) => {
            const playerTournamentIds = new Set();
            for (const game of games) {
                playerTournamentIds.add(game.tournament.id);
            }
            const playerTournamentsById = {};
            const gamesByTournamentId = {};
            const bestRoundByTournamentId = {};
            const moneyByTournamentId = {};
            for (const tournamentId of playerTournamentIds) {
                if (!gamesByTournamentId[tournamentId.toString()]) {
                    gamesByTournamentId[tournamentId.toString()] = [];
                }
                for (const game of games) {
                    if (!playerTournamentsById[tournamentId.toString()] &&
                        game.tournament.id == tournamentId) {
                        playerTournamentsById[tournamentId.toString()] = game.tournament;
                    }
                    if (game.tournament.id == tournamentId) {
                        gamesByTournamentId[tournamentId.toString()].push(game);
                    }
                }
                for (const game of gamesByTournamentId[tournamentId.toString()]) {
                    if (game.player1Id == playerId) {
                        const bestRound = bestRoundByTournamentId[tournamentId.toString()] || 0;
                        bestRoundByTournamentId[tournamentId.toString()] =
                            game.roundId > bestRound ? game.roundId : bestRound;
                    }
                }
                moneyByTournamentId[tournamentId.toString()] =
                    playerTournamentsById[tournamentId.toString()].singlesPrize[this.roundIdToName(bestRoundByTournamentId[tournamentId.toString()])];
            }
            let playerSum = 0;
            for (const moneyKey of Object.keys(moneyByTournamentId)) {
                if (moneyByTournamentId[moneyKey])
                    playerSum +=
                        moneyByTournamentId[moneyKey] > 0
                            ? moneyByTournamentId[moneyKey]
                            : 0;
            }
            return playerSum;
        });
    }
    roundIdToName(roundId) {
        switch (roundId) {
            case -1:
                return 'preQualifying';
            case 0:
                return 'qualifyingFirst';
            case 1:
                return 'qualifyingSecond';
            case 2:
                return 'qualifying';
            case 3:
                return 'first';
            case 4:
                return 'second';
            case 5:
                return 'third';
            case 6:
                return 'fourth';
            case 7:
                return 'quarterFinalist';
            case 9:
                return 'semiFinalist';
            case 10:
                return 'finalist';
            case 12:
                return 'winner';
        }
        return 0;
    }
    async getLevelBreakdown(playerId, playerStatRepo, year) {
        let res = await playerStatRepo
            .createQueryBuilder('stat')
            .where('stat.player = :playerId', { playerId: playerId })
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
                                w: ((_b = (_a = prev[key][objKey]) === null || _a === void 0 ? void 0 : _a.w) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = actual[key][objKey]) === null || _c === void 0 ? void 0 : _c.w) !== null && _d !== void 0 ? _d : 0),
                                l: ((_f = (_e = prev[key][objKey]) === null || _e === void 0 ? void 0 : _e.l) !== null && _f !== void 0 ? _f : 0) + ((_h = (_g = actual[key][objKey]) === null || _g === void 0 ? void 0 : _g.l) !== null && _h !== void 0 ? _h : 0),
                            };
                            return obj;
                        }))).reduce((prev, current) => (Object.assign(Object.assign({}, prev), current)));
                    };
                    const level = wlResult('level');
                    const temp = {
                        level: Object.assign(Object.assign({}, prev['level']), level),
                    };
                    return temp;
                });
            }
            return result;
        });
        console.log(res);
        if (year == undefined || year == null || year == '') {
            return res['career'];
        }
        else {
            return res[year];
        }
    }
};
H2hService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(today_entity_1.TodayAtp)),
    __param(1, (0, typeorm_1.InjectRepository)(today_entity_1.TodayWta)),
    __param(2, (0, typeorm_1.InjectRepository)(game_entity_1.GameAtp)),
    __param(3, (0, typeorm_1.InjectRepository)(game_entity_1.GameWta)),
    __param(4, (0, typeorm_1.InjectRepository)(player_entity_1.PlayerAtp)),
    __param(5, (0, typeorm_1.InjectRepository)(player_entity_1.PlayerWta)),
    __param(6, (0, typeorm_1.InjectRepository)(stat_entity_1.StatAtp)),
    __param(7, (0, typeorm_1.InjectRepository)(stat_entity_1.StatWta)),
    __param(8, (0, typeorm_1.InjectRepository)(player_stat_entity_1.PlayerStatAtp)),
    __param(9, (0, typeorm_1.InjectRepository)(player_stat_entity_1.PlayerStatWta)),
    __param(10, (0, typeorm_1.InjectRepository)(tournament_entity_1.TournamentAtp)),
    __param(11, (0, typeorm_1.InjectRepository)(tournament_entity_1.TournamentWta)),
    __param(12, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(13, (0, typeorm_1.InjectRepository)(round_entity_1.Round)),
    __param(14, (0, typeorm_1.InjectRepository)(rank_entity_1.Rank)),
    __param(15, (0, typeorm_1.InjectRepository)(rating_entity_1.RatingAtp)),
    __param(16, (0, typeorm_1.InjectRepository)(rating_entity_1.RatingWta)),
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
        typeorm_2.Connection,
        shared_service_1.SharedService,
        game_service_1.GameService])
], H2hService);
exports.H2hService = H2hService;
//# sourceMappingURL=h2h.service.js.map