"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateH2hDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_h2h_dto_1 = require("./create-h2h.dto");
class UpdateH2hDto extends (0, mapped_types_1.PartialType)(create_h2h_dto_1.CreateH2hDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateH2hDto = UpdateH2hDto;
//# sourceMappingURL=update-h2h.dto.js.map