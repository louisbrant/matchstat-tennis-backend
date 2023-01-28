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
exports.TodayWta = exports.TodayAtp = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../../player/entity/player.entity");
const tournament_entity_1 = require("../../tournament/entity/tournament.entity");
const round_entity_1 = require("../../round/entity/round.entity");
class Today {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, date: { required: true, type: () => Date }, round: { required: true, type: () => require("../../round/entity/round.entity").Round }, roundId: { required: true, type: () => Number }, draw: { required: true, type: () => Number }, result: { required: true, type: () => String }, complete: { required: true, type: () => Number }, live: { required: true, type: () => String }, timeGame: { required: true, type: () => Date }, reserveInt: { required: true, type: () => Number }, reserveString: { required: true, type: () => String }, odd1: { required: true, type: () => String }, odd2: { required: true, type: () => String }, seed1: { required: true, type: () => String }, seed2: { required: true, type: () => String }, player1Id: { required: true, type: () => Number }, player2Id: { required: true, type: () => Number }, tournamentId: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Today.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Date)
], Today.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => round_entity_1.Round),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", round_entity_1.Round)
], Today.prototype, "round", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Today.prototype, "roundId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Today.prototype, "draw", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Today.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Today.prototype, "complete", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Today.prototype, "live", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Date)
], Today.prototype, "timeGame", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Today.prototype, "reserveInt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Today.prototype, "reserveString", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Today.prototype, "odd1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Today.prototype, "odd2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Today.prototype, "seed1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Today.prototype, "seed2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Today.prototype, "player1Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Today.prototype, "player2Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Today.prototype, "tournamentId", void 0);
let TodayAtp = class TodayAtp extends Today {
    static _OPENAPI_METADATA_FACTORY() {
        return { player1: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp }, player2: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp }, tournament: { required: true, type: () => require("../../tournament/entity/tournament.entity").TournamentAtp } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerAtp)
], TodayAtp.prototype, "player1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerAtp)
], TodayAtp.prototype, "player2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => tournament_entity_1.TournamentAtp),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", tournament_entity_1.TournamentAtp)
], TodayAtp.prototype, "tournament", void 0);
TodayAtp = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['tournamentId', 'player1Id', 'player2Id', 'roundId'])
], TodayAtp);
exports.TodayAtp = TodayAtp;
let TodayWta = class TodayWta extends Today {
    static _OPENAPI_METADATA_FACTORY() {
        return { player1: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta }, player2: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta }, tournament: { required: true, type: () => require("../../tournament/entity/tournament.entity").TournamentWta } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], TodayWta.prototype, "player1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], TodayWta.prototype, "player2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => tournament_entity_1.TournamentWta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", tournament_entity_1.TournamentWta)
], TodayWta.prototype, "tournament", void 0);
TodayWta = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['tournamentId', 'player1Id', 'player2Id', 'roundId'])
], TodayWta);
exports.TodayWta = TodayWta;
//# sourceMappingURL=today.entity.js.map