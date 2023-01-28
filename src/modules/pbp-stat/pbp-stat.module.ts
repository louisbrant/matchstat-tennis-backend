import { Module } from '@nestjs/common';
import { PbpStatController } from 'src/controllers/pbp-stat.controller';
import { PbpStatService } from 'src/services/pbp-stat.service';

@Module({
  controllers: [PbpStatController],
  providers: [PbpStatService],
})
export class PbpStatModule {}
