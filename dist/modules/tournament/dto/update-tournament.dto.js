"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTournamentDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tournament_dto_1 = require("./create-tournament.dto");
class UpdateTournamentDto extends (0, mapped_types_1.PartialType)(create_tournament_dto_1.CreateTournamentDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateTournamentDto = UpdateTournamentDto;
//# sourceMappingURL=update-tournament.dto.js.map