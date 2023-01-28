"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchPlayedGameDto = void 0;
const openapi = require("@nestjs/swagger");
class MatchPlayedGameDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: false, type: () => Number }, court: { required: false, type: () => String }, level: { required: false, type: () => Number }, round: { required: false, type: () => String }, year: { required: false, type: () => String }, tournament: { required: false, type: () => String }, week: { required: false, type: () => Number }, limit: { required: false, type: () => Number } };
    }
}
exports.MatchPlayedGameDto = MatchPlayedGameDto;
//# sourceMappingURL=match-played-game.dto.js.map