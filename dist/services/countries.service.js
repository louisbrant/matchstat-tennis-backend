"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesService = void 0;
const common_1 = require("@nestjs/common");
let CountriesService = class CountriesService {
    create(createCountryDto) {
        return 'This action adds a new country';
    }
    findAll() {
        return `This action returns all countries`;
    }
    findOne(id) {
        return `This action returns a #${id} country`;
    }
    update(id, updateCountryDto) {
        return `This action updates a #${id} country`;
    }
    remove(id) {
        return `This action removes a #${id} country`;
    }
};
CountriesService = __decorate([
    (0, common_1.Injectable)()
], CountriesService);
exports.CountriesService = CountriesService;
//# sourceMappingURL=countries.service.js.map