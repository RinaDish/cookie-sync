import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getUserHashWithSecret } from 'src/common/hash';
import { Side } from 'src/sync/domain/enum/side.enum';
import { SETTINGS_REPOSITORY_TOKEN } from 'src/sync/infrastructure/settings/interface/settings.repository';
import { SettingsStorageType } from 'src/sync/infrastructure/settings/interface/settings.storage';
import { SettingsRepository } from 'src/sync/infrastructure/settings/settings.repository';

@Injectable()
export class GetPartnerLinksHandler {
  constructor(
    @Inject(SETTINGS_REPOSITORY_TOKEN)
    private readonly settingsRepository: SettingsRepository,
    private readonly configService: ConfigService,
  ) {}
  async handle({ ip, userAgent }): Promise<string[]> {
    const partners = this.settingsRepository.getAll();
    const hash = getUserHashWithSecret(
      ip,
      userAgent,
      this.configService.get<string>('COOKIE_SYNC_SECRET'),
    );
    return this.getLinks(partners, hash);
  }

  getLinks(partners: SettingsStorageType, uid: string): string[] {
    const links = Object.keys(partners)
      .filter(
        (partnerId) =>
          partners[partnerId].callingSide === Side.we &&
          partners[partnerId].redirectLink,
      )
      .map((partnerId) =>
        partners[partnerId].redirectLink.replace('%24%7BUID%7D', uid),
      ); // ToDo add uid
    return links;
  }
}

// {
//     '9c3jtb': {
//       partnerName: 'partner',
//       callingSide: 'we',
//       storingSide: 'we',
//       redirectLink: 'https%3A%2F%2Fwww.google.com%2F%24%7BUID%7D'
//     }
//   }
