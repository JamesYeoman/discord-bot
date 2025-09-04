import type { RequestHandler } from '../types.js';

import { getHentaiThread, getTestChannel } from '../utils.js';

type Payload = { caption?: string; media?: string };
export const sendMeme = (payload: Payload): RequestHandler => {
  return async (client) => {
    const ht = await getTestChannel(client);

    if (payload.caption) await ht.send(payload.caption);
    if (payload.media) await ht.send(payload.media);
  };
};
