import { IncomingMessage, ServerResponse } from 'http';

import type { RequestListener } from 'http';

import { Client } from 'discord.js';

import { logger } from '../main';
import { wishBirthday } from './bday';
import { california } from './california';
import { oot } from './out_of_touch';

type routeHandler = (
  client: Client,
  req: IncomingMessage,
  res: ServerResponse,
) => Promise<void>;

const handler =
  (client: Client): RequestListener =>
  (req, res) => {
    if (!req.url || !req.headers.host) {
      logger.error('Request object is badly formed!');
      res.statusCode = 500;
      res.end('Unknown error!');
      return;
    }

    const path = new URL(req.url, `http://${req.headers.host}`);
    logger.info(`Received a request for ${path.pathname}`);

    let fn: routeHandler;
    switch (path.pathname) {
      case '/memes/california':
        fn = california;
        break;
      case '/memes/oot':
        fn = oot;
      case '/bday/http501':
        fn = wishBirthday('HTTP-501#4329');
        break;
      default:
        logger.info(`Unknown route: ${path.pathname}`);
        res.statusCode = 404;
        res.end(`Bad route: ${path.pathname}`);
        return;
    }

    fn(client, req, res)
      .then(() => {
        logger.info(`Finished ${path.pathname} route`);
        res.statusCode = 200;
        res.end('Success');
      })
      .catch((err) => {
        logger.error(err, `Error while handling ${path.pathname}`);
        res.end('Error');
      });
  };

export default handler;
