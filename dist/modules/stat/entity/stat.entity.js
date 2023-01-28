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
exports.StatWta = exports.StatAtp = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../../player/entity/player.entity");
const tournament_entity_1 = require("../../tournament/entity/tournament.entity");
class Stat {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, round: { required: true, type: () => Number }, firstServe1: { required: true, type: () => Number }, firstServeOf1: { required: true, type: () => Number }, aces1: { required: true, type: () => Number }, doubleFaults1: { required: true, type: () => Number }, unforcedErrors1: { required: true, type: () => Number }, winningOnFirstServe1: { required: true, type: () => Number }, winningOnFirstServeOf1: { required: true, type: () => Number }, winningOnSecondServe1: { required: true, type: () => Number }, winningOnSecondServeOf1: { required: true, type: () => Number }, winners1: { required: true, type: () => Number }, breakPointsConverted1: { required: true, type: () => Number }, breakPointsConvertedOf1: { required: true, type: () => Number }, netApproaches1: { required: true, type: () => Number }, netApproachesOf1: { required: true, type: () => Number }, totalPointsWon1: { required: true, type: () => Number }, fastestServe1: { required: true, type: () => Number }, averageFirstServeSpeed1: { required: true, type: () => Number }, averageSecondServeSpeed1: { required: true, type: () => Number }, firstServe2: { required: true, type: () => Number }, firstServeOf2: { required: true, type: () => Number }, aces2: { required: true, type: () => Number }, doubleFaults2: { required: true, type: () => Number }, unforcedErrors2: { required: true, type: () => Number }, winningOnFirstServe2: { required: true, type: () => Number }, winningOnFirstServeOf2: { required: true, type: () => Number }, winningOnSecondServe2: { required: true, type: () => Number }, winningOnSecondServeOf2: { required: true, type: () => Number }, winners2: { required: true, type: () => Number }, breakPointsConverted2: { required: true, type: () => Number }, breakPointsConvertedOf2: { required: true, type: () => Number }, netApproaches2: { required: true, type: () => Number }, netApproachesOf2: { required: true, type: () => Number }, totalPointsWon2: { required: true, type: () => Number }, fastestServe2: { required: true, type: () => Number }, averageFirstServeSpeed2: { required: true, type: () => Number }, averageSecondServeSpeed2: { required: true, type: () => Number }, rpw1: { required: true, type: () => Number }, rpwOf1: { required: true, type: () => Number }, rpw2: { required: true, type: () => Number }, rpwOf2: { required: true, type: () => Number }, mt: { required: true, type: () => String }, tournamentId: { required: true, type: () => Number }, player1Id: { required: true, type: () => Number }, player2Id: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Stat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stat.prototype, "round", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "firstServe1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "firstServeOf1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "aces1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "doubleFaults1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "unforcedErrors1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "winningOnFirstServe1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "winningOnFirstServeOf1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "winningOnSecondServe1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "winningOnSecondServeOf1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "winners1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "breakPointsConverted1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "breakPointsConvertedOf1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "netApproaches1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "netApproachesOf1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "totalPointsWon1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "fastestServe1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "averageFirstServeSpeed1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "averageSecondServeSpeed1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "firstServe2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "firstServeOf2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "aces2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "doubleFaults2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "unforcedErrors2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "winningOnFirstServe2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "winningOnFirstServeOf2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "winningOnSecondServe2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "winningOnSecondServeOf2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "winners2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "breakPointsConverted2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "breakPointsConvertedOf2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "netApproaches2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "netApproachesOf2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "totalPointsWon2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "fastestServe2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "averageFirstServeSpeed2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "averageSecondServeSpeed2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "rpw1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "rpwOf1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "rpw2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stat.prototype, "rpwOf2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Stat.prototype, "mt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stat.prototype, "tournamentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stat.prototype, "player1Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stat.prototype, "player2Id", void 0);
let StatAtp = class StatAtp extends Stat {
    static _OPENAPI_METADATA_FACTORY() {
        return { player1: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp }, player2: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp }, tournament: { required: true, type: () => require("../../tournament/entity/tournament.entity").TournamentAtp } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp, (player) => player.statsWinner),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerAtp)
], StatAtp.prototype, "player1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp, (player) => player.statsLoser),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerAtp)
], StatAtp.prototype, "player2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => tournament_entity_1.TournamentAtp),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", tournament_entity_1.TournamentAtp)
], StatAtp.prototype, "tournament", void 0);
StatAtp = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['player1Id', 'player2Id', 'tournamentId', 'round'])
], StatAtp);
exports.StatAtp = StatAtp;
let StatWta = class StatWta extends Stat {
    static _OPENAPI_METADATA_FACTORY() {
        return { player1: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta }, player2: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta }, tournament: { required: true, type: () => require("../../tournament/entity/tournament.entity").TournamentWta } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta, (player) => player.statsWinner),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], StatWta.prototype, "player1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta, (player) => player.statsLoser),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], StatWta.prototype, "player2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => tournament_entity_1.TournamentWta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", tournament_entity_1.TournamentWta)
], StatWta.prototype, "tournament", void 0);
StatWta = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['player1Id', 'player2Id', 'tournamentId', 'round'])
], StatWta);
exports.StatWta = StatWta;
//# sourceMappingURL=stat.entity.js.map