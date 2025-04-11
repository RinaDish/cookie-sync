import { Injectable } from '@nestjs/common';
import { SettingsRepositoryInterface } from './interface/settings.repository';
import { SettingsStorageType } from './interface/settings.storage';
import { Partner } from 'src/sync/domain/types/partner';

@Injectable()
export class SettingsRepository implements SettingsRepositoryInterface {
  private readonly settingsRepo: SettingsStorageType = new Object();

  getAll(): SettingsStorageType {
    return this.settingsRepo;
  }

  find(partnerId: string): Partner | null {
    return this.settingsRepo[partnerId];
  }

  save(
    partnerId: string,
    { partnerName, callingSide, storingSide, redirectLink }: Partner,
  ) {
    if (!this.settingsRepo[partnerId])
      this.settingsRepo[partnerId] = {
        partnerName,
        callingSide,
        storingSide,
        redirectLink,
      };
  }
}
