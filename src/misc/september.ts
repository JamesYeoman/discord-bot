import { RequestHandler } from '../types';
import { getHentaiThread } from '../utils';

export const september: RequestHandler = async (client) => {
  const ht = await getHentaiThread(client);
  await ht.send('Do you remember? The 21st night of September?');
  await ht.send('https://www.youtube.com/watch?v=3RcGCRTD7sA');
};
