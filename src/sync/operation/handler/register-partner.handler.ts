import { Inject, Injectable } from '@nestjs/common';
import { SETTINGS_REPOSITORY_TOKEN } from 'src/sync/infrastructure/settings/interface/settings.repository';
import { SettingsRepository } from 'src/sync/infrastructure/settings/settings.repository';
import { RegisterPartnerRequest } from '../request/register-partner.request';


@Injectable()
export class RegisterPartnerHandler {
    constructor(
        @Inject(SETTINGS_REPOSITORY_TOKEN)
        private readonly settingsRepository: SettingsRepository,
    ) { }
    async handle({
        partnerName,
        callingSide,
        storingSide,
        redirectLink }: RegisterPartnerRequest): Promise<string> {
        const partnerId = this.generateRandomString(6);

        this.settingsRepository.save(partnerId, partnerName, callingSide, storingSide, redirectLink)
        return partnerId;
    }

    generateRandomString(length: number = 6): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }

        return result;
    }

}
