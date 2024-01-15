import {Controller, Get} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {HealthService} from './health.service';
import {EApiTags} from '../../shared/enum';
import {HealthCheck} from '@nestjs/terminus';

@ApiTags(EApiTags.HEALTH_CHECK)
@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  @ApiOperation({
    operationId: 'healthCheck',
    description: 'Health check endpoint',
  })
  @HealthCheck()
  async healthCheck() {
    return this.healthService.healthCheck();
  }
}
