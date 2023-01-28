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
exports.H2hWta = exports.H2hAtp = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../../player/entity/player.entity");
class H2h {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, player1Wins: { required: true, type: () => Number }, player2Wins: { required: true, type: () => Number }, player1Id: { required: true, type: () => Number }, player2Id: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], H2h.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], H2h.prototype, "player1Wins", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], H2h.prototype, "player2Wins", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], H2h.prototype, "player1Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], H2h.prototype, "player2Id", void 0);
let H2hAtp = class H2hAtp extends H2h {
    static _OPENAPI_METADATA_FACTORY() {
        return { player1: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp }, player2: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerAtp)
], H2hAtp.prototype, "player1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerAtp)
], H2hAtp.prototype, "player2", void 0);
H2hAtp = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['player1Id', 'player2Id'])
], H2hAtp);
exports.H2hAtp = H2hAtp;
let H2hWta = class H2hWta extends H2h {
    static _OPENAPI_METADATA_FACTORY() {
        return { player1: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta }, player2: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], H2hWta.prototype, "player1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], H2hWta.prototype, "player2", void 0);
H2hWta = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['player1Id', 'player2Id'])
], H2hWta);
exports.H2hWta = H2hWta;
//# sourceMappingURL=h2h.entity.js.map