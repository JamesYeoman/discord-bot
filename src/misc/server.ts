import type { RequestListener } from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import { Client } from 'discord.js';
import { california } from './california';
import { logger } from '../main';

type routeHandler = (
  client: Client,
  req: IncomingMessage,
  res: ServerResponse,
) => Promise<void>;

const handler =
  (client: Client): RequestListener =>
  (req, res) => {
    if (!req.url || !req.headers.host) {
      return;
    }

    const path = new URL(req.url, `http://${req.headers.host}`);
    let fn: routeHandler;

    switch (path.pathname) {
      case '/memes/california':
        fn = california;
        break;
      default:
        logger.debug(`Unknown route: ${path.pathname}`);
        return;
    }

    fn(client, req, res)
      .then(() => {
        logger.debug(`Finished ${path.pathname} route`);
      })
      .catch((err) => {
        logger.error(err, `Error while handling ${path.pathname}`);
      });
  };

export default handler;
