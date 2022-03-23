import { Awaitable, ClientEvents } from 'discord.js';
import jack_mald from './jack_mald';
import jack_poopoohead from './jack_poopoohead';
import ready from './on_ready';

export interface EventType<T extends keyof ClientEvents> {
  name: T;
  once: boolean;
  execute: (...args: ClientEvents[T]) => Awaitable<void>;
}

// Gotta work around Typescript here, if I want auto registration
// of the events...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const events: EventType<any>[] = [jack_mald, ready, jack_poopoohead];
export default events;
