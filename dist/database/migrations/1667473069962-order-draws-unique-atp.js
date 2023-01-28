"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDrawsUniqueAtp1667473069962 = void 0;
class orderDrawsUniqueAtp1667473069962 {
    constructor() {
        this.name = "orderDrawsUniqueAtp1667473069962";
    }
    async up(queryRunner) {
        await queryRunner.query(`truncate table public.draw_order_atp`);
        await queryRunner.query(`ALTER TABLE draw_order_atp ADD CONSTRAINT "draw_order_wta_draw_key" UNIQUE (draw, "roundId", "player1Id", "player2Id", "tournamentId");`);
    }
    async down(queryRunner) {
    }
}
exports.orderDrawsUniqueAtp1667473069962 = orderDrawsUniqueAtp1667473069962;
//# sourceMappingURL=1667473069962-order-draws-unique-atp.js.map