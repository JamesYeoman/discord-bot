import type { Awaitable, ClientEvents } from 'discord.js';

import ready from './on_ready';

export interface EventType<T extends keyof ClientEvents> {
  name: T;
  once: boolean;
  execute: (...args: ClientEvents[T]) => Awaitable<void>;
}

// Gotta work around Typescript here, if I want auto registration
// of the events...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const events: EventType<any>[] = [ready];
export default events;
