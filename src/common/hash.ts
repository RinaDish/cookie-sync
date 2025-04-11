import { createHmac } from 'crypto';

export const getUserHashWithSecret = (
  ip: string,
  userAgent: string,
  secret: string,
): string => {
  const raw = `${ip}-${userAgent}`;
  return createHmac('sha256', secret).update(raw).digest('hex');
};
