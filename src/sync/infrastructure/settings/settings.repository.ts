import { Injectable } from '@nestjs/common';
import { Side } from 'src/sync/domain/enum/side.enum';
import { SettingsRepositoryInterface } from './interface/settings.repository';
import { SettingsStorageType } from './interface/settings.storage';

@Injectable()
export class SettingsRepository implements SettingsRepositoryInterface {
    private readonly settingsRepo: SettingsStorageType = new Object();

    getAll(
    ): SettingsStorageType {
        return this.settingsRepo;
    }

    find(
        partnerId: string,
    ): Promise<Record<string, string> | null> {
        return this.settingsRepo[partnerId];
    }

    save(
        partnerId: string,
        partnerName: string,
        callingSide: Side,
        storingSide: Side,
        redirectLink?: string
    ) {
        if (!this.settingsRepo[partnerId]) this.settingsRepo[partnerId] = {
            partnerName,
            callingSide,
            storingSide,
            redirectLink
        };
    }
}
