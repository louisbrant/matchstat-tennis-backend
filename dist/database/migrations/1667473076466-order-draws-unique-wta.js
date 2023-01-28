"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDrawsUniqueWta1667473076466 = void 0;
class orderDrawsUniqueWta1667473076466 {
    constructor() {
        this.name = "orderDrawsUniqueWta1667473076466";
    }
    async up(queryRunner) {
        await queryRunner.query(`truncate table public.draw_order_atp`);
        await queryRunner.query(`ALTER TABLE draw_order_atp ADD CONSTRAINT "draw_order_atp_draw_key" UNIQUE (draw, "roundId", "player1Id", "player2Id", "tournamentId");`);
    }
    async down(queryRunner) {
    }
}
exports.orderDrawsUniqueWta1667473076466 = orderDrawsUniqueWta1667473076466;
//# sourceMappingURL=1667473076466-order-draws-unique-wta.js.map