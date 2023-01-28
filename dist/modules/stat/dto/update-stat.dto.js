"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_stat_dto_1 = require("./create-stat.dto");
class UpdateStatDto extends (0, mapped_types_1.PartialType)(create_stat_dto_1.CreateStatDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateStatDto = UpdateStatDto;
//# sourceMappingURL=update-stat.dto.js.map