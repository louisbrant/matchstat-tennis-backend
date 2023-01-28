"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEpDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ep_dto_1 = require("./create-ep.dto");
class UpdateEpDto extends (0, mapped_types_1.PartialType)(create_ep_dto_1.CreateEpDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateEpDto = UpdateEpDto;
//# sourceMappingURL=update-ep.dto.js.map