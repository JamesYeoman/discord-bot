import type { RequestHandler } from '../types.js';
import type { Client } from 'discord.js';
import type { RequestListener } from 'http';

import { idDict } from '../utils.js';
import { wishBirthday } from './bday.js';
import { sendMeme } from './sendMeme.js';
import memePayloads from './meme_payloads.json' with { type: 'json' };

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

    let fn: RequestHandler | undefined = undefined;

    if (path.pathname.startsWith('/memes')) {
      const meme = path.pathname.replace('/memes/', '');

      if (meme in memePayloads) {
        fn = sendMeme(memePayloads[meme as keyof typeof memePayloads]);
      }
    } else if (path.pathname.startsWith('/bday')) {
      const bday = path.pathname.replace('/bday/', '');

      if (bday === 'http501') {
        fn = wishBirthday(idDict.http501);
      }
    }

    if (fn === undefined) {
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
