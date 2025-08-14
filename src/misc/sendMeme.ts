import type { RequestHandler } from '../types.js';

import { getHentaiThread } from '../utils.js';

type Payload = { caption?: string; media: string };
export const sendMeme = (payload: Payload): RequestHandler => {
  return async (client) => {
    const ht = await getHentaiThread(client);

    if (payload.caption) await ht.send(payload.caption);
    await ht.send(payload.media);
  };
};
