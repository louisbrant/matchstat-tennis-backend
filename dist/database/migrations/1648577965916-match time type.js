"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchTimeType1648577965916 = void 0;
class matchTimeType1648577965916 {
    constructor() {
        this.name = 'matchTimeType1648577965916';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "stat_atp" DROP COLUMN "mt"`);
        await queryRunner.query(`ALTER TABLE "stat_atp" ADD "mt" character varying`);
        await queryRunner.query(`ALTER TABLE "stat_wta" DROP COLUMN "mt"`);
        await queryRunner.query(`ALTER TABLE "stat_wta" ADD "mt" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "stat_wta" DROP COLUMN "mt"`);
        await queryRunner.query(`ALTER TABLE "stat_wta" ADD "mt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "stat_atp" DROP COLUMN "mt"`);
        await queryRunner.query(`ALTER TABLE "stat_atp" ADD "mt" TIMESTAMP`);
    }
}
exports.matchTimeType1648577965916 = matchTimeType1648577965916;
//# sourceMappingURL=1648577965916-match%20time%20type.js.map