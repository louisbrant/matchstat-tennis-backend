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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const shared_service_1 = require("./shared.service");
let GameService = class GameService {
    constructor(sharedService) {
        this.sharedService = sharedService;
    }
    create(createGameDto) {
        return 'This action adds a new game';
    }
    findAll() {
        return `This action returns all game`;
    }
    findOne(id) {
        return `This action returns a #${id} game`;
    }
    update(id, updateGameDto) {
        return `This action updates a #${id} game`;
    }
    remove(id) {
        return `This action removes a #${id} game`;
    }
    mapGameStats(type, game) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
        const player1Stats = {
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
        };
        const player2Stats = {
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
        };
        return {
            player1: Object.assign(Object.assign({}, game.player1), { seed: game.seed1, odd: game.odd1, image: this.sharedService.getPlayerImage(type, game.player1.id), stats: this.isEmptyObject(player1Stats) ? player1Stats : null }),
            player2: Object.assign(Object.assign({}, game.player2), { seed: game.seed2, odd: game.odd2, image: this.sharedService.getPlayerImage(type, game.player2.id), stats: this.isEmptyObject(player2Stats) ? player2Stats : null }),
        };
    }
    isEmptyObject(object) {
        return Object.keys(object).filter((key) => object[key]).length > 0;
    }
};
GameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shared_service_1.SharedService])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map