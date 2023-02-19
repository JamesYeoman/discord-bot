import type { Client } from 'discord.js';
import type { IncomingMessage, ServerResponse } from 'http';

export type RequestHandler = (
  client: Client,
  req: IncomingMessage,
  res: ServerResponse,
) => Promise<void>;
