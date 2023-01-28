"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawOrderUniqueKeysWta1667542569033 = void 0;
class drawOrderUniqueKeysWta1667542569033 {
    constructor() {
        this.name = "drawOrderUniqueKeysWta1667542569033";
    }
    async up(queryRunner) {
        await queryRunner.query(`truncate table public.draw_order_wta`);
        await queryRunner.query(`ALTER TABLE draw_order_wta ADD CONSTRAINT "draw_order_draw_wta_key" UNIQUE (draw, "roundId", "player1Id", "player2Id", "tournamentId");`);
    }
    async down(queryRunner) {
    }
}
exports.drawOrderUniqueKeysWta1667542569033 = drawOrderUniqueKeysWta1667542569033;
//# sourceMappingURL=1667542569033-draw-order-unique-keys-wta.js.map