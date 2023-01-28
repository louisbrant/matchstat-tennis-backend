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
exports.PointPrize = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let PointPrize = class PointPrize {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, winner: { required: true, type: () => Number }, finalist: { required: true, type: () => Number }, semiFinalist: { required: true, type: () => Number }, quarterFinalist: { required: true, type: () => Number }, fourth: { required: true, type: () => Number }, third: { required: true, type: () => Number }, second: { required: true, type: () => Number }, first: { required: true, type: () => Number }, qualifying: { required: true, type: () => Number }, qualifyingSecond: { required: true, type: () => Number }, qualifyingFirst: { required: true, type: () => Number }, preQualifying: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], PointPrize.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PointPrize.prototype, "winner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PointPrize.prototype, "finalist", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointPrize.prototype, "semiFinalist", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointPrize.prototype, "quarterFinalist", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointPrize.prototype, "fourth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointPrize.prototype, "third", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointPrize.prototype, "second", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointPrize.prototype, "first", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointPrize.prototype, "qualifying", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointPrize.prototype, "qualifyingSecond", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointPrize.prototype, "qualifyingFirst", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PointPrize.prototype, "preQualifying", void 0);
PointPrize = __decorate([
    (0, typeorm_1.Entity)({ name: 'point' })
], PointPrize);
exports.PointPrize = PointPrize;
//# sourceMappingURL=prize.entity.js.map