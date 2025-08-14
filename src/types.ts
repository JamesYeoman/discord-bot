import type { Awaitable, Client, ClientEvents } from 'discord.js';
import type { IncomingMessage, ServerResponse } from 'http';

export type RequestHandler = (
  client: Client,
  req: IncomingMessage,
  res: ServerResponse,
) => Promise<void>;

export interface EventType<T extends keyof ClientEvents> {
  name: T;
  once: boolean;
  execute: (...args: ClientEvents[T]) => Awaitable<void>;
}
