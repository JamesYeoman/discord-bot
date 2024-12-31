import type { RequestHandler } from '../types';

import { getHentaiThread } from '../utils';

const californiaMp4 =
  'https://cdn.discordapp.com/attachments/1076878871980425256/1076879247232209006/today_is_friday_in_california.mp4';

export const california: RequestHandler = async (client) => {
  const hentaiThread = await getHentaiThread(client);
  await hentaiThread.send(californiaMp4);
};
