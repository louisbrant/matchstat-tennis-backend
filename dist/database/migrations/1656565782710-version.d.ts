import { MigrationInterface, QueryRunner } from "typeorm";
export declare class version1656565782710 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
