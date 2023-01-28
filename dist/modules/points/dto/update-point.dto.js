"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePointDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_point_dto_1 = require("./create-point.dto");
class UpdatePointDto extends (0, mapped_types_1.PartialType)(create_point_dto_1.CreatePointDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePointDto = UpdatePointDto;
//# sourceMappingURL=update-point.dto.js.map