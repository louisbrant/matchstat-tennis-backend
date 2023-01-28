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
exports.PlayerStatWta = exports.PlayerStatAtp = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../../player/entity/player.entity");
class PlayerStat {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, data: { required: true, type: () => String }, playerId: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlayerStat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", String)
], PlayerStat.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PlayerStat.prototype, "playerId", void 0);
let PlayerStatAtp = class PlayerStatAtp extends PlayerStat {
    static _OPENAPI_METADATA_FACTORY() {
        return { player: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerAtp)
], PlayerStatAtp.prototype, "player", void 0);
PlayerStatAtp = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['playerId'])
], PlayerStatAtp);
exports.PlayerStatAtp = PlayerStatAtp;
let PlayerStatWta = class PlayerStatWta extends PlayerStat {
    static _OPENAPI_METADATA_FACTORY() {
        return { player: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], PlayerStatWta.prototype, "player", void 0);
PlayerStatWta = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['playerId'])
], PlayerStatWta);
exports.PlayerStatWta = PlayerStatWta;
//# sourceMappingURL=player-stat.entity.js.map