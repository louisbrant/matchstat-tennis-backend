"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingMatchesDto = void 0;
const openapi = require("@nestjs/swagger");
class UpcomingMatchesDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { date: { required: true, type: () => Number }, limit: { required: true, type: () => Number } };
    }
}
exports.UpcomingMatchesDto = UpcomingMatchesDto;
//# sourceMappingURL=upcoming-matches.dto.js.map