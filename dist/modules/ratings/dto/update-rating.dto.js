"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRatingDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_rating_dto_1 = require("./create-rating.dto");
class UpdateRatingDto extends (0, mapped_types_1.PartialType)(create_rating_dto_1.CreateRatingDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateRatingDto = UpdateRatingDto;
//# sourceMappingURL=update-rating.dto.js.map