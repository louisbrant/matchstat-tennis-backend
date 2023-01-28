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
exports.PlayerWta = exports.PlayerAtp = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const game_entity_1 = require("../../game/entity/game.entity");
const stat_entity_1 = require("../../stat/entity/stat.entity");
const ep_entity_1 = require("../../ep/entity/ep.entity");
const country_entity_1 = require("../../country/entity/country.entity");
const rating_entity_1 = require("../../ratings/entity/rating.entity");
class Player {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, birthday: { required: true, type: () => Date }, country: { required: true, type: () => require("../../country/entity/country.entity").Country }, countryAcr: { required: true, type: () => String }, currentRank: { required: true, type: () => Number }, progress: { required: true, type: () => Number }, points: { required: true, type: () => Number }, hardPoints: { required: true, type: () => Number }, hardTournament: { required: true, type: () => Number }, clayPoints: { required: true, type: () => Number }, clayTournament: { required: true, type: () => Number }, grassPoints: { required: true, type: () => Number }, grassTournament: { required: true, type: () => Number }, carpetPoints: { required: true, type: () => Number }, carterTournament: { required: true, type: () => Number }, prize: { required: true, type: () => Number }, ch: { required: true, type: () => Number }, doublesPosition: { required: true, type: () => Number }, doublesProgress: { required: true, type: () => Number }, doublesPoints: { required: true, type: () => Number }, ihardPoints: { required: true, type: () => Number }, ihardTournament: { required: true, type: () => Number }, itf: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Date)
], Player.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => country_entity_1.Country, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", country_entity_1.Country)
], Player.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'countryAcronym', nullable: true }),
    __metadata("design:type", String)
], Player.prototype, "countryAcr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "currentRank", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "hardPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "hardTournament", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "clayPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "clayTournament", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "grassPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "grassTournament", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "carpetPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "carterTournament", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "prize", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "ch", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "doublesPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "doublesProgress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "doublesPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "ihardPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "ihardTournament", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "itf", void 0);
let PlayerAtp = class PlayerAtp extends Player {
    static _OPENAPI_METADATA_FACTORY() {
        return { rating: { required: true, type: () => [require("../../ratings/entity/rating.entity").RatingAtp] }, gamesWinner: { required: true, type: () => [require("../../game/entity/game.entity").GameAtp] }, gamesLoser: { required: true, type: () => [require("../../game/entity/game.entity").GameAtp] }, games: { required: true, type: () => [require("../../game/entity/game.entity").GameAtp] }, statsWinner: { required: true, type: () => [require("../../stat/entity/stat.entity").StatAtp] }, statsLoser: { required: true, type: () => [require("../../stat/entity/stat.entity").StatAtp] }, information: { required: true, type: () => [require("../../ep/entity/ep.entity").EpAtp] } };
    }
};
__decorate([
    (0, typeorm_1.OneToMany)((type) => rating_entity_1.RatingAtp, (rating) => rating.player),
    __metadata("design:type", Array)
], PlayerAtp.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => game_entity_1.GameAtp, (game) => game.player1),
    __metadata("design:type", Array)
], PlayerAtp.prototype, "gamesWinner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => game_entity_1.GameAtp, (game) => game.player2),
    __metadata("design:type", Array)
], PlayerAtp.prototype, "gamesLoser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => game_entity_1.GameAtp, (game) => game.players),
    __metadata("design:type", Array)
], PlayerAtp.prototype, "games", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => stat_entity_1.StatAtp, (stat) => stat.player1),
    __metadata("design:type", Array)
], PlayerAtp.prototype, "statsWinner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => stat_entity_1.StatAtp, (stat) => stat.player2),
    __metadata("design:type", Array)
], PlayerAtp.prototype, "statsLoser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => ep_entity_1.EpAtp, (ep) => ep.player),
    __metadata("design:type", Array)
], PlayerAtp.prototype, "information", void 0);
PlayerAtp = __decorate([
    (0, typeorm_1.Entity)()
], PlayerAtp);
exports.PlayerAtp = PlayerAtp;
let PlayerWta = class PlayerWta extends Player {
    static _OPENAPI_METADATA_FACTORY() {
        return { rating: { required: true, type: () => [require("../../ratings/entity/rating.entity").RatingWta] }, gamesWinner: { required: true, type: () => [require("../../game/entity/game.entity").GameWta] }, gamesLoser: { required: true, type: () => [require("../../game/entity/game.entity").GameWta] }, games: { required: true, type: () => [require("../../game/entity/game.entity").GameWta] }, statsWinner: { required: true, type: () => [require("../../stat/entity/stat.entity").StatWta] }, statsLoser: { required: true, type: () => [require("../../stat/entity/stat.entity").StatWta] }, information: { required: true, type: () => [require("../../ep/entity/ep.entity").EpWta] } };
    }
};
__decorate([
    (0, typeorm_1.OneToMany)((type) => rating_entity_1.RatingWta, (rating) => rating.player),
    __metadata("design:type", Array)
], PlayerWta.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => game_entity_1.GameWta, (game) => game.player1),
    __metadata("design:type", Array)
], PlayerWta.prototype, "gamesWinner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => game_entity_1.GameWta, (game) => game.player2),
    __metadata("design:type", Array)
], PlayerWta.prototype, "gamesLoser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => game_entity_1.GameWta, (game) => game.players),
    __metadata("design:type", Array)
], PlayerWta.prototype, "games", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => stat_entity_1.StatWta, (stat) => stat.player1),
    __metadata("design:type", Array)
], PlayerWta.prototype, "statsWinner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => stat_entity_1.StatWta, (stat) => stat.player2),
    __metadata("design:type", Array)
], PlayerWta.prototype, "statsLoser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => ep_entity_1.EpWta, (ep) => ep.player),
    __metadata("design:type", Array)
], PlayerWta.prototype, "information", void 0);
PlayerWta = __decorate([
    (0, typeorm_1.Entity)()
], PlayerWta);
exports.PlayerWta = PlayerWta;
//# sourceMappingURL=player.entity.js.map