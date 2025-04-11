import { Module } from '@nestjs/common';
import { UiModule } from './ui/ui.module';
import { OperationModule } from './operation/operation.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [UiModule, OperationModule, InfrastructureModule, DomainModule]
})
export class SyncModule {}
