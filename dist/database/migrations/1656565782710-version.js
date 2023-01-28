"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version1656565782710 = void 0;
class version1656565782710 {
    constructor() {
        this.name = 'version1656565782710';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "version" ("ver" character varying NOT NULL, "dat" character varying NOT NULL, "atp" character varying NOT NULL, "wta" character varying NOT NULL, CONSTRAINT "PK_d9ba39728cf6cf65fc62d84ee22" PRIMARY KEY ("ver"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "version"`);
    }
}
exports.version1656565782710 = version1656565782710;
//# sourceMappingURL=1656565782710-version.js.map