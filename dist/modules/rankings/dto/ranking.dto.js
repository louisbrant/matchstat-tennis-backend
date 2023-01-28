"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingDto = void 0;
const openapi = require("@nestjs/swagger");
class RankingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { date: { required: true, type: () => String }, group: { required: true, type: () => Object }, countryAcr: { required: false, type: () => String }, page: { required: false, type: () => Number } };
    }
}
exports.RankingDto = RankingDto;
//# sourceMappingURL=ranking.dto.js.map