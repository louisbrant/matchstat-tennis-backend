import { MigrationInterface, QueryRunner } from "typeorm";
export declare class orderDrawsUniqueWta1667473076466 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
