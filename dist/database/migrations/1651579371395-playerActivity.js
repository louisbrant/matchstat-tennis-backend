"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerActivity1651579371395 = void 0;
class playerActivity1651579371395 {
    constructor() {
        this.name = 'playerActivity1651579371395';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "ep_atp" ADD "playerStatus" character varying NOT NULL DEFAULT 'Active'`);
        await queryRunner.query(`ALTER TABLE "ep_wta" ADD "playerStatus" character varying NOT NULL DEFAULT 'Active'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "ep_wta" DROP COLUMN "playerStatus"`);
        await queryRunner.query(`ALTER TABLE "ep_atp" DROP COLUMN "playerStatus"`);
    }
}
exports.playerActivity1651579371395 = playerActivity1651579371395;
//# sourceMappingURL=1651579371395-playerActivity.js.map