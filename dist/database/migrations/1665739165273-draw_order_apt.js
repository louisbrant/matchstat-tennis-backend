"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawOrderApt1665739165273 = void 0;
class drawOrderApt1665739165273 {
    constructor() {
        this.name = 'drawOrderApt1665739165273';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "draw_order_atp" ("id" SERIAL NOT NULL, "draw" integer NOT NULL UNIQUE, PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "draw_order_apt"`);
    }
}
exports.drawOrderApt1665739165273 = drawOrderApt1665739165273;
//# sourceMappingURL=1665739165273-draw_order_apt.js.map