import type { RequestHandler } from '../types';
import type { Client } from 'discord.js';
import type { RequestListener } from 'http';

import { wishBirthday } from './bday';
import { california } from './california';
import { oot } from './out_of_touch';
import { september } from './september';

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
        fn = california;
        break;
      case '/memes/oot':
        fn = oot;
        break;
      case '/memes/september':
        fn = september;
        break;
      case '/bday/http501':
        fn = wishBirthday('HTTP-501#4329');
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
