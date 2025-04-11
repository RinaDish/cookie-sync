import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { GetCookiesHandler } from './handler/get-cookies.handler';
import { GetPartnerCallHandler } from './handler/get-partner-call.handler';
import { GetPartnerLinksHandler } from './handler/get-partner-links.handler';
import { RegisterPartnerHandler } from './handler/register-partner.handler';

const handlers = [
  GetPartnerCallHandler,
  GetCookiesHandler,
  RegisterPartnerHandler,
  GetPartnerLinksHandler,
];

@Module({
  providers: [...handlers],
  imports: [InfrastructureModule, DomainModule],
  exports: [...handlers],
})
export class OperationModule {}
