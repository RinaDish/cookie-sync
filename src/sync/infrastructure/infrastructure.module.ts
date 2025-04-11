import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { CookiesRepository } from './cookies/cookies.repository';
import { COOKIES_REPOSITORY_TOKEN } from './cookies/interface/cookies.repository';
import { SETTINGS_REPOSITORY_TOKEN } from './settings/interface/settings.repository';
import { SettingsRepository } from './settings/settings.repository';

@Module({
    providers: [
        CookiesRepository,
        SettingsRepository,
        {
            provide: COOKIES_REPOSITORY_TOKEN,
            useClass: CookiesRepository,
        },
        {
            provide: SETTINGS_REPOSITORY_TOKEN,
            useClass: SettingsRepository,
        }
    ],
    imports: [DomainModule],
    exports: [CookiesRepository, SettingsRepository, SETTINGS_REPOSITORY_TOKEN, COOKIES_REPOSITORY_TOKEN],
})
export class InfrastructureModule { }
