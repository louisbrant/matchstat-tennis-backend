"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDrawPositionForGames1649886601888 = void 0;
class addDrawPositionForGames1649886601888 {
    constructor() {
        this.name = 'addDrawPositionForGames1649886601888';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "game_atp" ADD "draw" integer`);
        await queryRunner.query(`ALTER TABLE "game_wta" ADD "draw" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "game_wta" DROP COLUMN "draw"`);
        await queryRunner.query(`ALTER TABLE "game_atp" DROP COLUMN "draw"`);
    }
}
exports.addDrawPositionForGames1649886601888 = addDrawPositionForGames1649886601888;
//# sourceMappingURL=1649886601888-add_draw_position_for_games.js.map