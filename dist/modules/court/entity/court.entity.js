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
exports.Court = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const tournament_entity_1 = require("../../tournament/entity/tournament.entity");
let Court = class Court {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, tournaments: { required: true, type: () => [require("../../tournament/entity/tournament.entity").TournamentAtp] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Court.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Court.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => tournament_entity_1.TournamentAtp, (tournament) => tournament.court),
    __metadata("design:type", Array)
], Court.prototype, "tournaments", void 0);
Court = __decorate([
    (0, typeorm_1.Entity)()
], Court);
exports.Court = Court;
//# sourceMappingURL=court.entity.js.map