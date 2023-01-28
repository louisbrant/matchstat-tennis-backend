"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawOrderWta1665739844117 = void 0;
class drawOrderWta1665739844117 {
    constructor() {
        this.name = "drawOrderWta1665739844117";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "draw_order_wta" ("id" SERIAL NOT NULL, "draw" integer NOT NULL UNIQUE, PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "draw_order_wta"`);
    }
}
exports.drawOrderWta1665739844117 = drawOrderWta1665739844117;
//# sourceMappingURL=1665739844117-draw_order_wta.js.map