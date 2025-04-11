export const COOKIES_REPOSITORY_TOKEN = Symbol('COOKIES_REPOSITORY');

export interface CookiesRepositoryInterface {
  getAll(partnerId: string): Promise<Record<string, string>>;
  find(partnerId: string, partnerUid: string): Promise<string | null>;
  save(partnerId: string, partnerUid: string, generatedCookie: string);
}
