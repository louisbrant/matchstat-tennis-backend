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
exports.TournamentWta = exports.TournamentAtp = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const game_entity_1 = require("../../game/entity/game.entity");
const country_entity_1 = require("../../country/entity/country.entity");
const rank_entity_1 = require("../../rank/entity/rank.entity");
const prize_entity_1 = require("../../points/entity/prize.entity");
const court_entity_1 = require("../../court/entity/court.entity");
class Tournament {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, court: { required: true, type: () => require("../../court/entity/court.entity").Court }, courtId: { required: true, type: () => Number }, date: { required: true, type: () => Date }, rank: { required: true, type: () => require("../../rank/entity/rank.entity").Rank }, rankId: { required: true, type: () => Number }, link: { required: true, type: () => Number }, country: { required: true, type: () => require("../../country/entity/country.entity").Country }, countryAcr: { required: true, type: () => String }, prize: { required: true, type: () => String }, rating: { required: true, type: () => require("../../points/entity/prize.entity").PointPrize }, ratingId: { required: true, type: () => Number }, url: { required: true, type: () => String }, latitude: { required: true, type: () => Number }, longitude: { required: true, type: () => Number }, site: { required: true, type: () => String }, race: { required: true, type: () => Number }, entry: { required: true, type: () => Number }, singlesPrize: { required: true, type: () => require("../../points/entity/prize.entity").PointPrize }, singlesPrizeId: { required: true, type: () => Number }, doublesMoney: { required: true, type: () => require("../../points/entity/prize.entity").PointPrize }, doublesMoneyId: { required: true, type: () => Number }, tier: { required: true, type: () => String }, reserveInt: { required: true, type: () => Number }, reserveChar: { required: true, type: () => String }, live: { required: true, type: () => String }, result: { required: true, type: () => String } };
    }
}
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Tournament.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tournament.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => court_entity_1.Court, (court) => court.tournaments),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", court_entity_1.Court)
], Tournament.prototype, "court", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tournament.prototype, "courtId", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], Tournament.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rank_entity_1.Rank),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", rank_entity_1.Rank)
], Tournament.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tournament.prototype, "rankId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tournament.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => country_entity_1.Country),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", country_entity_1.Country)
], Tournament.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'countryAcronym' }),
    __metadata("design:type", String)
], Tournament.prototype, "countryAcr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tournament.prototype, "prize", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => prize_entity_1.PointPrize),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", prize_entity_1.PointPrize)
], Tournament.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tournament.prototype, "ratingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tournament.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)('double precision', { nullable: true }),
    __metadata("design:type", Number)
], Tournament.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('double precision', { nullable: true }),
    __metadata("design:type", Number)
], Tournament.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tournament.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tournament.prototype, "race", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tournament.prototype, "entry", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => prize_entity_1.PointPrize),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", prize_entity_1.PointPrize)
], Tournament.prototype, "singlesPrize", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tournament.prototype, "singlesPrizeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => prize_entity_1.PointPrize),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", prize_entity_1.PointPrize)
], Tournament.prototype, "doublesMoney", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tournament.prototype, "doublesMoneyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tournament.prototype, "tier", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tournament.prototype, "reserveInt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tournament.prototype, "reserveChar", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tournament.prototype, "live", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tournament.prototype, "result", void 0);
let TournamentAtp = class TournamentAtp extends Tournament {
    static _OPENAPI_METADATA_FACTORY() {
        return { games: { required: true, type: () => [require("../../game/entity/game.entity").GameAtp] } };
    }
};
__decorate([
    (0, typeorm_1.OneToMany)((type) => game_entity_1.GameAtp, (game) => game.tournament),
    __metadata("design:type", Array)
], TournamentAtp.prototype, "games", void 0);
TournamentAtp = __decorate([
    (0, typeorm_1.Entity)()
], TournamentAtp);
exports.TournamentAtp = TournamentAtp;
let TournamentWta = class TournamentWta extends Tournament {
    static _OPENAPI_METADATA_FACTORY() {
        return { games: { required: true, type: () => [require("../../game/entity/game.entity").GameWta] } };
    }
};
__decorate([
    (0, typeorm_1.OneToMany)((type) => game_entity_1.GameWta, (game) => game.tournament),
    __metadata("design:type", Array)
], TournamentWta.prototype, "games", void 0);
TournamentWta = __decorate([
    (0, typeorm_1.Entity)()
], TournamentWta);
exports.TournamentWta = TournamentWta;
//# sourceMappingURL=tournament.entity.js.map