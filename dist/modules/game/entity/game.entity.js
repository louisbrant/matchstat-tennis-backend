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
exports.GameWta = exports.GameAtp = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../../player/entity/player.entity");
const tournament_entity_1 = require("../../tournament/entity/tournament.entity");
const round_entity_1 = require("../../round/entity/round.entity");
class Game {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, round: { required: true, type: () => require("../../round/entity/round.entity").Round }, roundId: { required: true, type: () => Number }, result: { required: true, type: () => String }, date: { required: true, type: () => Date }, seed1: { required: true, type: () => String }, seed2: { required: true, type: () => String }, odd1: { required: true, type: () => String }, odd2: { required: true, type: () => String }, player1Id: { required: true, type: () => Number }, player2Id: { required: true, type: () => Number }, tournamentId: { required: true, type: () => Number }, draw: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Game.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => round_entity_1.Round),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", round_entity_1.Round)
], Game.prototype, "round", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Game.prototype, "roundId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Game.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Date)
], Game.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Game.prototype, "seed1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Game.prototype, "seed2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Game.prototype, "odd1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Game.prototype, "odd2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Game.prototype, "player1Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Game.prototype, "player2Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Game.prototype, "tournamentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Game.prototype, "draw", void 0);
let GameAtp = class GameAtp extends Game {
    static _OPENAPI_METADATA_FACTORY() {
        return { tournament: { required: true, type: () => require("../../tournament/entity/tournament.entity").TournamentAtp }, player1: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp }, player2: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp }, players: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => tournament_entity_1.TournamentAtp, (tournament) => tournament.games),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", tournament_entity_1.TournamentAtp)
], GameAtp.prototype, "tournament", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp, (player) => player.gamesWinner),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerAtp)
], GameAtp.prototype, "player1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp, (player) => player.gamesLoser),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerAtp)
], GameAtp.prototype, "player2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp, (player) => player.games),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerAtp)
], GameAtp.prototype, "players", void 0);
GameAtp = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['player1Id', 'player2Id', 'tournamentId', 'roundId'])
], GameAtp);
exports.GameAtp = GameAtp;
let GameWta = class GameWta extends Game {
    static _OPENAPI_METADATA_FACTORY() {
        return { tournament: { required: true, type: () => require("../../tournament/entity/tournament.entity").TournamentWta }, player1: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta }, player2: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta }, players: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => tournament_entity_1.TournamentWta, (tournament) => tournament.games),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", tournament_entity_1.TournamentWta)
], GameWta.prototype, "tournament", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta, (player) => player.gamesWinner),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], GameWta.prototype, "player1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta, (player) => player.gamesLoser),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], GameWta.prototype, "player2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta, (player) => player.games),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], GameWta.prototype, "players", void 0);
GameWta = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['player1Id', 'player2Id', 'tournamentId', 'roundId'])
], GameWta);
exports.GameWta = GameWta;
//# sourceMappingURL=game.entity.js.map