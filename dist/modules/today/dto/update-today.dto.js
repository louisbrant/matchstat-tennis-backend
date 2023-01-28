"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodayDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_today_dto_1 = require("./create-today.dto");
class UpdateTodayDto extends (0, mapped_types_1.PartialType)(create_today_dto_1.CreateTodayDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateTodayDto = UpdateTodayDto;
//# sourceMappingURL=update-today.dto.js.map