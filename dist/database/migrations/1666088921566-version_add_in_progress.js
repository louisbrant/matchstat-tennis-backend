"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionAddInProgress1666088921566 = void 0;
class versionAddInProgress1666088921566 {
    constructor() {
        this.name = "versionAddInProgress1666088921566";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "version" ADD "inProgress" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "version" DROP COLUMN "inProgress"`);
    }
}
exports.versionAddInProgress1666088921566 = versionAddInProgress1666088921566;
//# sourceMappingURL=1666088921566-version_add_in_progress.js.map