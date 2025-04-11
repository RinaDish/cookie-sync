import { Side } from "src/sync/domain/enum/side.enum";
import { SettingsStorageType } from "./settings.storage";

export const SETTINGS_REPOSITORY_TOKEN = Symbol(
    'SETTINGS_REPOSITORY',
);

export interface SettingsRepositoryInterface {
    getAll(
    ): SettingsStorageType;
    find(
        partnerId: string,
    ): Promise<Record<string, string> | null>;
    save(
        partnerId: string,
        partnerName: string,
        callingSide: Side,
        storingSide: Side,
        redirectLink?: string
    );
}
