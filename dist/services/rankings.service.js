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
exports.RankingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const rating_entity_1 = require("../modules/ratings/entity/rating.entity");
const country_entity_1 = require("../modules/country/entity/country.entity");
const player_entity_1 = require("../modules/player/entity/player.entity");
const shared_service_1 = require("./shared.service");
const court_entity_1 = require("../modules/court/entity/court.entity");
let RankingsService = class RankingsService {
    constructor(ratingAtpRepository, ratingWtaRepository, playerAtpRepository, playerWtaRepository, countryRepository, courtRepository, sharedService) {
        this.ratingAtpRepository = ratingAtpRepository;
        this.ratingWtaRepository = ratingWtaRepository;
        this.playerAtpRepository = playerAtpRepository;
        this.playerWtaRepository = playerWtaRepository;
        this.countryRepository = countryRepository;
        this.courtRepository = courtRepository;
        this.sharedService = sharedService;
    }
    rankingTop10(type) {
        let ratingRepository;
        if (type == 'atp') {
            ratingRepository = this.ratingAtpRepository;
        }
        else if (type == 'wta') {
            ratingRepository = this.ratingWtaRepository;
        }
        else {
            return { error: 'Type not found!' };
        }
        return ratingRepository
            .createQueryBuilder('rating')
            .leftJoin('rating.player', 'player')
            .addSelect(['player.name', 'player.countryAcr'])
            .orderBy('rating.date', 'DESC')
            .addOrderBy('rating.position')
            .limit(10)
            .getMany();
    }
    ranking(type, queryParams) {
        let ratingRepository;
        let playerRepository;
        if (type == 'atp') {
            ratingRepository = this.ratingAtpRepository;
            playerRepository = this.playerAtpRepository;
        }
        else if (type == 'wta') {
            ratingRepository = this.ratingWtaRepository;
            playerRepository = this.playerWtaRepository;
        }
        else {
            return { error: 'Type not found!' };
        }
        if (queryParams.group != 'doubles' &&
            queryParams.group != 'prize' &&
            !(queryParams === null || queryParams === void 0 ? void 0 : queryParams.date)) {
            return { error: 'Needs date in query params!' };
        }
        if (!(queryParams === null || queryParams === void 0 ? void 0 : queryParams.group)) {
            return { error: 'Needs group in query params!' };
        }
        if (queryParams.group == 'singles') {
            return this.singlesRanking(ratingRepository, queryParams);
        }
        if (queryParams.group == 'doubles') {
            return this.doublesRanking(playerRepository, queryParams);
        }
        if (queryParams.group == 'race') {
            return this.raceRanking(ratingRepository, queryParams);
        }
        if (queryParams.group == 'surface') {
            return [];
        }
        if (queryParams.group == 'prize') {
            return this.prizeRanking(playerRepository, type, queryParams);
        }
        return { error: 'Group not found!' };
    }
    async rankingFilters(type) {
        let ratingRepository;
        if (type == 'atp') {
            ratingRepository = this.ratingAtpRepository;
        }
        else if (type == 'wta') {
            ratingRepository = this.ratingWtaRepository;
        }
        else {
            return { error: 'Type not found!' };
        }
        return ratingRepository
            .createQueryBuilder('rating')
            .select('rating.date')
            .distinctOn(['rating.date'])
            .orderBy('rating.date', 'DESC')
            .getMany()
            .then(async (ratings) => ({
            countries: await this.countryRepository.find({
                where: { name: (0, typeorm_1.Not)('') },
            }),
            surfaces: await this.courtRepository.find(),
            date: ratings.map((rating) => rating.date),
        }));
    }
    async singlesRanking(ratingRepository, queryParams) {
        const splitDate = queryParams.date.split('.');
        const formatDate = [...splitDate.reverse()].join('-');
        const currentDate = new Date(formatDate);
        const dates = await ratingRepository
            .query(`
          select date from rating_atp
          where extract(year from date)=extract(year from now())
             or extract(year from date)=extract(year from now())-1
          group by date
          order by date DESC;
          `)
            .then((date) => date.map((el) => el.date));
        const lastWeek = new Date(dates[1]);
        const lastYear = new Date(dates[51]);
        const pageSize = 100;
        const response = this.getRankingByDate(ratingRepository, currentDate, queryParams, pageSize, queryParams.page);
        return response.getMany().then(async (rankings) => {
            const rankingPlayers = rankings.map((rank) => rank.player.id);
            const rankingLastYear = await ratingRepository
                .createQueryBuilder('rating')
                .leftJoin('rating.player', 'player')
                .addSelect(['player.name', 'player.countryAcr'])
                .where('rating.date = :lastYear', {
                lastYear,
            })
                .andWhere(`player.id in (${rankingPlayers})`)
                .orderBy('rating.date', 'DESC')
                .addOrderBy('rating.position')
                .getMany();
            const rankingLastWeek = await ratingRepository
                .createQueryBuilder('rating')
                .leftJoin('rating.player', 'player')
                .addSelect(['player.name', 'player.countryAcr'])
                .where('rating.date = :lastWeek', {
                lastWeek,
            })
                .andWhere(`player.id in (${rankingPlayers})`)
                .orderBy('rating.date', 'DESC')
                .addOrderBy('rating.position')
                .getMany();
            const currentRankings = rankings.filter((ranking) => ranking.date.getTime() == currentDate.getTime());
            return currentRankings.map((ranking) => {
                var _a, _b, _c;
                return ({
                    date: ranking.date,
                    pts: ranking.point,
                    wk: (((_a = rankingLastWeek.find((weekRanking) => weekRanking.player.name == ranking.player.name)) === null || _a === void 0 ? void 0 : _a.position) || 900) - ranking.position,
                    yr: (((_b = rankingLastYear.find((weekRanking) => weekRanking.player.name == ranking.player.name)) === null || _b === void 0 ? void 0 : _b.position) || 900) - ranking.position,
                    wkPts: ranking.point -
                        ((_c = rankingLastWeek.find((weekRanking) => weekRanking.player.name == ranking.player.name)) === null || _c === void 0 ? void 0 : _c.point) || 0,
                    position: ranking.position,
                    player: ranking.player,
                });
            });
        });
    }
    getRankingByDate(ratingRepository, date, queryParams, pageSize, page) {
        let response = ratingRepository
            .createQueryBuilder('rating')
            .leftJoin('rating.player', 'player')
            .addSelect(['player.name', 'player.countryAcr', 'player.id'])
            .where('(rating.date = :date)', { date })
            .orderBy('rating.date', 'DESC')
            .addOrderBy('rating.position')
            .limit(pageSize)
            .offset(pageSize * page);
        if (queryParams === null || queryParams === void 0 ? void 0 : queryParams.countryAcr) {
            response = response.andWhere('player.countryAcr = :queryCountry', {
                queryCountry: queryParams.countryAcr,
            });
        }
        return response;
    }
    doublesRanking(playerRepository, queryParams) {
        let response = playerRepository
            .createQueryBuilder('player')
            .where('player.doublesPosition is not null')
            .orderBy('player.doublesPosition');
        if (queryParams === null || queryParams === void 0 ? void 0 : queryParams.countryAcr) {
            response = response.andWhere('player.countryAcr = :queryCountry', {
                queryCountry: queryParams.countryAcr,
            });
        }
        return response.getMany().then((players) => players.map((player) => ({
            pts: player.doublesPoints,
            wk: player.doublesProgress,
            position: player.doublesPosition,
            player: player,
        })));
    }
    async raceRanking(ratingRepository, queryParams) {
        const fromYear = new Date(new Date().getFullYear().toString()).toLocaleDateString();
        const yearRatingDates = await ratingRepository.query(`select date
       from rating_atp
       where date >= '${fromYear}'::date
       group by date
       order by date`);
        const currentDate = yearRatingDates[yearRatingDates.length > 1 ? yearRatingDates.length - 1 : 0].date;
        const lastWeekDate = yearRatingDates[yearRatingDates.length > 1
            ? yearRatingDates.length - 2
            : yearRatingDates.length].date;
        const firstYearDate = yearRatingDates[0].date;
        const response = ratingRepository
            .createQueryBuilder('rating')
            .leftJoin('rating.player', 'player')
            .addSelect(['player.name', 'player.countryAcr'])
            .where(`(rating.date = :firstYearDate or rating.date = :currentDate or rating.date = :lastWeekDate)`, {
            currentDate,
            firstYearDate,
            lastWeekDate,
        })
            .orderBy('rating.date', 'DESC')
            .addOrderBy('rating.position');
        return response.getMany().then((rankings) => {
            const currentRankings = rankings.filter((ranking) => ranking.date.getTime() == currentDate.getTime());
            const lastWeekRankings = rankings.filter((ranking) => ranking.date.getTime() == lastWeekDate.getTime());
            const firstYearWeekRankings = rankings.filter((ranking) => ranking.date.getTime() == firstYearDate.getTime());
            const response = currentRankings
                .map((ranking) => {
                var _a, _b;
                return ({
                    date: ranking.date,
                    pts: ranking.point -
                        ((_a = firstYearWeekRankings.find((yearRanking) => yearRanking.player.name == ranking.player.name)) === null || _a === void 0 ? void 0 : _a.point) || 0,
                    wkPts: ranking.point -
                        ((_b = lastWeekRankings.find((weekRanking) => weekRanking.player.name == ranking.player.name)) === null || _b === void 0 ? void 0 : _b.point) || 0,
                    position: ranking.position,
                    player: ranking.player,
                });
            })
                .sort((a, b) => b.pts - a.pts)
                .map((ranking, index) => (Object.assign(Object.assign({}, ranking), { position: index + 1 })));
            if (!queryParams.countryAcr)
                return response;
            return response.filter((ranking) => ranking.player.countryAcr == queryParams.countryAcr);
        });
    }
    prizeRanking(playerRepository, type, queryParams) {
        var _a;
        const limit = 100;
        const offset = parseInt(((_a = queryParams === null || queryParams === void 0 ? void 0 : queryParams.page) !== null && _a !== void 0 ? _a : 0).toString()) * limit;
        return playerRepository
            .createQueryBuilder('player')
            .select(['player.name', 'player.id', 'player.countryAcr', 'player.prize'])
            .where('player.prize is not null')
            .andWhere("player.name not like '%/%'")
            .orderBy('player.prize', 'DESC')
            .limit(limit)
            .offset(offset)
            .getMany()
            .then((players) => players.map((player, index) => {
            var _a;
            return ({
                player,
                prize: player.prize,
                position: index + 1 + ((_a = queryParams === null || queryParams === void 0 ? void 0 : queryParams.page) !== null && _a !== void 0 ? _a : 0) * 100,
            });
        }));
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
};
RankingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(rating_entity_1.RatingAtp)),
    __param(1, (0, typeorm_2.InjectRepository)(rating_entity_1.RatingWta)),
    __param(2, (0, typeorm_2.InjectRepository)(player_entity_1.PlayerAtp)),
    __param(3, (0, typeorm_2.InjectRepository)(player_entity_1.PlayerWta)),
    __param(4, (0, typeorm_2.InjectRepository)(country_entity_1.Country)),
    __param(5, (0, typeorm_2.InjectRepository)(court_entity_1.Court)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        shared_service_1.SharedService])
], RankingsService);
exports.RankingsService = RankingsService;
//# sourceMappingURL=rankings.service.js.map