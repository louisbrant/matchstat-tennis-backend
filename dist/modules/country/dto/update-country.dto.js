"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCountryDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_country_dto_1 = require("./create-country.dto");
class UpdateCountryDto extends (0, mapped_types_1.PartialType)(create_country_dto_1.CreateCountryDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCountryDto = UpdateCountryDto;
//# sourceMappingURL=update-country.dto.js.map