"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointPrizeService = void 0;
const common_1 = require("@nestjs/common");
let PointPrizeService = class PointPrizeService {
    create(createPointDto) {
        return 'This action adds a new point';
    }
    findAll() {
        return `This action returns all points`;
    }
    findOne(id) {
        return `This action returns a #${id} point`;
    }
    update(id, updatePointDto) {
        return `This action updates a #${id} point`;
    }
    remove(id) {
        return `This action removes a #${id} point`;
    }
};
PointPrizeService = __decorate([
    (0, common_1.Injectable)()
], PointPrizeService);
exports.PointPrizeService = PointPrizeService;
//# sourceMappingURL=point-prize.service.js.map