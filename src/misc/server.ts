import type { RequestHandler } from '../types';
import type { Client } from 'discord.js';
import type { RequestListener } from 'http';

import { idDict } from '../utils';
import { wishBirthday } from './bday';
import { sendMeme } from './sendMeme';

const MEME_CACHE_CHANNEL = 'https://cdn.discordapp.com/attachments/1076878871980425256';
const memePayloads = {
  california: {
    media: `${MEME_CACHE_CHANNEL}/1076879247232209006/today_is_friday_in_california.mp4`,
  },
  oot: {
    caption: 'Happy Out Of Touch Thursday',
    media: `${MEME_CACHE_CHANNEL}/1076878934114832384/out_of_touch.mp4`,
  },
  september: {
    caption: 'Do you remember? The 21st night of September?',
    media: 'https://www.youtube.com/watch?v=3RcGCRTD7sA',
  },
  wgw: {
    caption: 'White Girl Wednesday',
    media: 'https://tenor.com/view/ookami-mio-meme-gif-24268471',
  },
};

const handler =
  (client: Client): RequestListener =>
  (req, res) => {
    if (!req.url || !req.headers.host) {
      console.error('Request object is badly formed!');
      res.statusCode = 500;
      res.end('Unknown error!');
      return;
    }

    const path = new URL(req.url, `http://${req.headers.host}`);
    console.info(`Received a request for ${path.pathname}`);

    let fn: RequestHandler;
    switch (path.pathname) {
      case '/memes/california':
        fn = sendMeme(memePayloads.california);
        break;
      case '/memes/oot':
        fn = sendMeme(memePayloads.oot);
        break;
      case '/memes/september':
        fn = sendMeme(memePayloads.september);
        break;
      case '/memes/wgw':
        fn = sendMeme(memePayloads.wgw);
        break;
      case '/bday/http501':
        fn = wishBirthday(idDict.http501);
        break;
      default:
        console.info(`Unknown route: ${path.pathname}`);
        res.statusCode = 404;
        res.end(`Bad route: ${path.pathname}`);
        return;
    }

    fn(client, req, res)
      .then(() => {
        console.info(`Finished ${path.pathname} route`);
        res.statusCode = 200;
        res.end('Success');
      })
      .catch((err) => {
        console.error(err, `Error while handling ${path.pathname}`);
        res.end('Error');
      });
  };

export default handler;
