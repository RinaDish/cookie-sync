import { Injectable } from '@nestjs/common';
import { CookiesRepositoryInterface } from './interface/cookies.repository';
import { CookiesStorageType } from './interface/cookies.storage';

@Injectable()
export class CookiesRepository implements CookiesRepositoryInterface {
  private readonly cookiesRepo: CookiesStorageType = new Object();

  getAll(partnerId: string): Promise<Record<string, string>> {
    return this.cookiesRepo[partnerId];
  }

  find(partnerId: string, partnerUid: string): Promise<string | null> {
    return this.cookiesRepo[partnerId][partnerUid];
  }

  save(partnerId: string, partnerUid: string, generatedCookie: string) {
    if (!this.cookiesRepo[partnerId]) this.cookiesRepo[partnerId] = {};
    if (!this.cookiesRepo[partnerId][partnerUid])
      this.cookiesRepo[partnerId][partnerUid] = generatedCookie;
  }
}
