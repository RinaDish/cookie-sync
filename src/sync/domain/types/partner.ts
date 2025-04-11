import { Side } from '../enum/side.enum';

export type Partner = {
  partnerName: string;
  callingSide: Side;
  storingSide: Side;
  redirectLink?: string;
};
