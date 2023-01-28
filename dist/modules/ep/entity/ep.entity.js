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
exports.EpWta = exports.EpAtp = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../../player/entity/player.entity");
class Ep {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, turnedPro: { required: true, type: () => String }, weight: { required: true, type: () => String }, height: { required: true, type: () => String }, birthplace: { required: true, type: () => String }, residence: { required: true, type: () => String }, plays: { required: true, type: () => String }, coach: { required: true, type: () => String }, site: { required: true, type: () => String }, twitter: { required: true, type: () => String }, page: { required: true, type: () => String }, instagram: { required: true, type: () => String }, facebook: { required: true, type: () => String }, last_revised: { required: true, type: () => String }, playerStatus: { required: true, type: () => String } };
    }
}
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Ep.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "turnedPro", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "birthplace", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "residence", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "plays", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "coach", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "twitter", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "page", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "instagram", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "facebook", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ep.prototype, "last_revised", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Active' }),
    __metadata("design:type", String)
], Ep.prototype, "playerStatus", void 0);
let EpAtp = class EpAtp extends Ep {
    static _OPENAPI_METADATA_FACTORY() {
        return { player: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp, (player) => player.id),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", player_entity_1.PlayerAtp)
], EpAtp.prototype, "player", void 0);
EpAtp = __decorate([
    (0, typeorm_1.Entity)()
], EpAtp);
exports.EpAtp = EpAtp;
let EpWta = class EpWta extends Ep {
    static _OPENAPI_METADATA_FACTORY() {
        return { player: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta, (player) => player.id),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", player_entity_1.PlayerWta)
], EpWta.prototype, "player", void 0);
EpWta = __decorate([
    (0, typeorm_1.Entity)()
], EpWta);
exports.EpWta = EpWta;
//# sourceMappingURL=ep.entity.js.map