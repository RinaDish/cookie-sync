import { Inject, Injectable } from '@nestjs/common';
import { GetPartnerCallRequest } from '../request/get-partner-call.request';
import { ConfigService } from '@nestjs/config';
import { CookiesRepository } from '../../infrastructure/cookies/cookies.repository';
import { COOKIES_REPOSITORY_TOKEN } from 'src/sync/infrastructure/cookies/interface/cookies.repository';
import { getUserHashWithSecret } from 'src/common/hash';
import { SETTINGS_REPOSITORY_TOKEN } from 'src/sync/infrastructure/settings/interface/settings.repository';
import { SettingsRepository } from 'src/sync/infrastructure/settings/settings.repository';
import { Side } from 'src/sync/domain/enum/side.enum';
import axios from 'axios';

@Injectable()
export class GetPartnerCallHandler {
  constructor(
    @Inject(COOKIES_REPOSITORY_TOKEN)
    private readonly cookiesRepository: CookiesRepository,
    @Inject(SETTINGS_REPOSITORY_TOKEN)
    private readonly settingsRepository: SettingsRepository,
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

    const partner = this.settingsRepository.find(partnerId);

    if (partner.storingSide === Side.we)
      this.cookiesRepository.save(partnerId, uid, hash);
    else if (partner.storingSide === Side.partner) {
      try {
        await axios.get(
          decodeURIComponent(
            partner.redirectLink.replace('%24%7BUID%7D', hash),
          ),
        );
      } catch (e) {
        throw e;
      }
    }
    return hash;
  }
}
