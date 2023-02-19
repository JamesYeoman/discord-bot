import { RequestHandler } from '../types';
import { getHentaiThread } from '../utils';

const mp4 =
  'https://cdn.discordapp.com/attachments/1076878871980425256/1076878934114832384/out_of_touch.mp4';

export const oot: RequestHandler = async (client) => {
  const ht = await getHentaiThread(client);
  await ht.send('Happy Out Of Touch Thursday');
  await ht.send(mp4);
};
