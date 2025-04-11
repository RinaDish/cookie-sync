import { SettingsStorageType } from './settings.storage';
import { Partner } from 'src/sync/domain/types/partner';

export const SETTINGS_REPOSITORY_TOKEN = Symbol('SETTINGS_REPOSITORY');

export interface SettingsRepositoryInterface {
  getAll(): SettingsStorageType;
  find(partnerId: string): Partner | null;
  save(partnerId: string, partner: Partner);
}
