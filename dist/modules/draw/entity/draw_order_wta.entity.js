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
exports.DrawOrderWta = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const round_entity_1 = require("../../round/entity/round.entity");
const player_entity_1 = require("../../player/entity/player.entity");
const tournament_entity_1 = require("../../tournament/entity/tournament.entity");
let DrawOrderWta = class DrawOrderWta {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, draw: { required: true, type: () => Number }, date: { required: true, type: () => Date }, round: { required: true, type: () => require("../../round/entity/round.entity").Round }, roundId: { required: true, type: () => Number }, player1: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta }, player1Id: { required: true, type: () => Number }, player2: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta }, player2Id: { required: true, type: () => Number }, tournament: { required: true, type: () => require("../../tournament/entity/tournament.entity").TournamentWta }, tournamentId: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DrawOrderWta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DrawOrderWta.prototype, "draw", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Date)
], DrawOrderWta.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => round_entity_1.Round),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", round_entity_1.Round)
], DrawOrderWta.prototype, "round", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DrawOrderWta.prototype, "roundId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], DrawOrderWta.prototype, "player1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DrawOrderWta.prototype, "player1Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], DrawOrderWta.prototype, "player2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DrawOrderWta.prototype, "player2Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => tournament_entity_1.TournamentWta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", tournament_entity_1.TournamentWta)
], DrawOrderWta.prototype, "tournament", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DrawOrderWta.prototype, "tournamentId", void 0);
DrawOrderWta = __decorate([
    (0, typeorm_1.Entity)()
], DrawOrderWta);
exports.DrawOrderWta = DrawOrderWta;
//# sourceMappingURL=draw_order_wta.entity.js.map