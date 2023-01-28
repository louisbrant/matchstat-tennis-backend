"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlayerStatDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_player_stat_dto_1 = require("./create-player-stat.dto");
class UpdatePlayerStatDto extends (0, mapped_types_1.PartialType)(create_player_stat_dto_1.CreatePlayerStatDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePlayerStatDto = UpdatePlayerStatDto;
//# sourceMappingURL=update-player-stat.dto.js.map