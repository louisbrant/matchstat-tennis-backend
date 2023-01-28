"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchStatPlayerDto = void 0;
const openapi = require("@nestjs/swagger");
class MatchStatPlayerDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { court: { required: false, type: () => String }, round: { required: false, type: () => String }, level: { required: false, type: () => Number } };
    }
}
exports.MatchStatPlayerDto = MatchStatPlayerDto;
//# sourceMappingURL=match-stat-player.dto.js.map