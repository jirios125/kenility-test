import { Module } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ManagementController } from './management.controller';

@Module({
  providers: [ManagementService],
  controllers: [ManagementController]
})
export class ManagementModule {}
