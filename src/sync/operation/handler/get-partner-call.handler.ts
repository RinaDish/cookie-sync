import { Inject, Injectable } from '@nestjs/common';
import { GetPartnerCallRequest } from '../request/get-partner-call.request';
import { ConfigService } from '@nestjs/config';
import { CookiesRepository } from '../../infrastructure/cookies/cookies.repository';
import { COOKIES_REPOSITORY_TOKEN } from 'src/sync/infrastructure/cookies/interface/cookies.repository';
import { getUserHashWithSecret } from 'src/common/hash';

@Injectable()
export class GetPartnerCallHandler {
  constructor(
    @Inject(COOKIES_REPOSITORY_TOKEN)
    private readonly cookiesRepository: CookiesRepository,
    private readonly configService: ConfigService,
  ) {}
  async handle({
    ip,
    userAgent,
    uid,
    partnerId,
  }: GetPartnerCallRequest): Promise<string> {
    const hash = getUserHashWithSecret(
      ip,
      userAgent,
      this.configService.get<string>('COOKIE_SYNC_SECRET'),
    );
    this.cookiesRepository.save(partnerId, uid, hash);
    return hash;
  }
}
