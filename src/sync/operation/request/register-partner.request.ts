import { Side } from 'src/sync/domain/enum/side.enum';

export type RegisterPartnerRequest = {
  partnerName: string;
  callingSide: Side;
  storingSide: Side;
  redirectLink?: string;
};
