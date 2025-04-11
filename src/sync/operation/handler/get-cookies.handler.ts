import { Inject, Injectable } from '@nestjs/common';
import { CookiesRepository } from '../../infrastructure/cookies/cookies.repository';
import { COOKIES_REPOSITORY_TOKEN } from 'src/sync/infrastructure/cookies/interface/cookies.repository';

@Injectable()
export class GetCookiesHandler {
  constructor(
    @Inject(COOKIES_REPOSITORY_TOKEN)
    private readonly cookiesRepository: CookiesRepository,
  ) {}
  async handle(partnerId: string): Promise<Record<string, string>> {
    return this.cookiesRepository.getAll(partnerId);
  }
}
