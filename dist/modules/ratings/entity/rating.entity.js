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
exports.RatingWta = exports.RatingAtp = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../../player/entity/player.entity");
class Rating {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, date: { required: true, type: () => Date }, point: { required: true, type: () => Number }, position: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rating.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone'),
    __metadata("design:type", Date)
], Rating.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Rating.prototype, "point", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Rating.prototype, "position", void 0);
let RatingAtp = class RatingAtp extends Rating {
    static _OPENAPI_METADATA_FACTORY() {
        return { player: { required: true, type: () => require("../../player/entity/player.entity").PlayerAtp } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerAtp),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerAtp)
], RatingAtp.prototype, "player", void 0);
RatingAtp = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['date', 'player'])
], RatingAtp);
exports.RatingAtp = RatingAtp;
let RatingWta = class RatingWta extends Rating {
    static _OPENAPI_METADATA_FACTORY() {
        return { player: { required: true, type: () => require("../../player/entity/player.entity").PlayerWta } };
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)((type) => player_entity_1.PlayerWta),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", player_entity_1.PlayerWta)
], RatingWta.prototype, "player", void 0);
RatingWta = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['date', 'player'])
], RatingWta);
exports.RatingWta = RatingWta;
//# sourceMappingURL=rating.entity.js.map