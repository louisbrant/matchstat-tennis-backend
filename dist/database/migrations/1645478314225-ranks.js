"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ranks1645478314225 = void 0;
class ranks1645478314225 {
    async up(queryRunner) {
        await queryRunner.manager
            .createQueryBuilder('Rank', 'rank')
            .insert()
            .into('Rank')
            .values([
            { id: 0, name: 'Futures/Satellites/ITF tournaments $10K' },
            { id: 1, name: 'Challengers/ITF tournaments > $10K' },
            { id: 2, name: 'Main tour' },
            { id: 3, name: 'Masters series' },
            { id: 4, name: 'Grand Slam' },
            { id: 5, name: 'Davis/Fed Cup' },
            { id: 6, name: 'Non ATP/WTA Events + Juniors' },
        ])
            .execute();
    }
    async down(queryRunner) {
    }
}
exports.ranks1645478314225 = ranks1645478314225;
//# sourceMappingURL=1645478314225-ranks.js.map