"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courts1645478295378 = void 0;
class courts1645478295378 {
    async up(queryRunner) {
        await queryRunner.manager
            .createQueryBuilder('Court', 'court')
            .insert()
            .into('Court')
            .values([
            { id: 6, name: 'Acrylic' },
            { id: 10, name: 'N/A' },
            { id: 2, name: 'Clay' },
            { id: 5, name: 'Grass' },
            { id: 4, name: 'Carpet' },
            { id: 1, name: 'Hard' },
            { id: 3, name: 'I.hard' },
        ])
            .execute();
    }
    async down(queryRunner) {
    }
}
exports.courts1645478295378 = courts1645478295378;
//# sourceMappingURL=1645478295378-courts.js.map