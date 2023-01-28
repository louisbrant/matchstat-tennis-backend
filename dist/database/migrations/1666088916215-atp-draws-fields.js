"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atpDrawsFields1666088916215 = void 0;
class atpDrawsFields1666088916215 {
    constructor() {
        this.name = "atpDrawsFields1666088916215";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE draw_order_atp ADD COLUMN "date" TIMESTAMP, ADD COLUMN "tournamentId" integer, ADD COLUMN "player1Id" integer, ADD COLUMN "player2Id" integer, ADD COLUMN "roundId" integer, DROP CONSTRAINT draw_order_atp_draw_key`);
    }
    async down(queryRunner) {
    }
}
exports.atpDrawsFields1666088916215 = atpDrawsFields1666088916215;
//# sourceMappingURL=1666088916215-atp-draws-fields.js.map