"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGameDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_game_dto_1 = require("./create-game.dto");
class UpdateGameDto extends (0, mapped_types_1.PartialType)(create_game_dto_1.CreateGameDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateGameDto = UpdateGameDto;
//# sourceMappingURL=update-game.dto.js.map