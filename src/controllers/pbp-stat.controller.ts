import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PbpStatService } from 'src/services/pbp-stat.service';

@Controller('tennis/api2/pbp-stat')
@ApiTags('live-events')
export class PbpStatController {
  constructor(private readonly pbpStatService: PbpStatService) {}

  @Get(':type')
  getStat(@Req() req) {
    return this.pbpStatService.getStats(req);
  }
}
