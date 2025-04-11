import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { OperationModule } from '../operation/operation.module';
import { CookiesController } from './http/cookies.controller';
import { PartnersController } from './http/partners.controller';

@Module({
  controllers: [CookiesController, PartnersController],
  imports: [OperationModule, InfrastructureModule, DomainModule],
})
export class UiModule {}
