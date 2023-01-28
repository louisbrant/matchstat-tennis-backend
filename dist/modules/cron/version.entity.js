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
exports.Version = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Version = class Version {
    static _OPENAPI_METADATA_FACTORY() {
        return { ver: { required: true, type: () => String }, dat: { required: true, type: () => String }, atp: { required: true, type: () => String }, wta: { required: true, type: () => String }, inProgress: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Version.prototype, "ver", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Version.prototype, "dat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Version.prototype, "atp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Version.prototype, "wta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Version.prototype, "inProgress", void 0);
Version = __decorate([
    (0, typeorm_1.Entity)()
], Version);
exports.Version = Version;
//# sourceMappingURL=version.entity.js.map