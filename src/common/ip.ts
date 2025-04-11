import { Socket } from 'net';

export interface RequestWithSocket extends Request {
  socket: Socket;
}
export function getClientIp(req: RequestWithSocket): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }

  return req.socket.remoteAddress ?? '';
}
