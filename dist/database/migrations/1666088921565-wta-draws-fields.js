"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wtaDrawsFields1666088921565 = void 0;
class wtaDrawsFields1666088921565 {
    constructor() {
        this.name = "wtaDrawsFields1666088921565";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE draw_order_wta ADD COLUMN "date" TIMESTAMP, ADD COLUMN "tournamentId" integer, ADD COLUMN "player1Id" integer, ADD COLUMN "player2Id" integer, ADD COLUMN "roundId" integer, DROP CONSTRAINT draw_order_wta_draw_key`);
    }
    async down(queryRunner) {
    }
}
exports.wtaDrawsFields1666088921565 = wtaDrawsFields1666088921565;
//# sourceMappingURL=1666088921565-wta-draws-fields.js.map