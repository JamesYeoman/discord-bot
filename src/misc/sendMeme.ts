import type { RequestHandler } from '../types';

import { getHentaiThread } from '../utils';

type Payload = { caption?: string; media: string };
export const sendMeme = (payload: Payload): RequestHandler => {
  return async (client) => {
    const ht = await getHentaiThread(client);

    if (payload.caption) await ht.send(payload.caption);
    await ht.send(payload.media);
  };
};
