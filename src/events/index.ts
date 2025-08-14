import type { EventType } from '../types.js';

import ready from './on_ready.js';

// Gotta work around Typescript here, if I want auto registration
// of the events...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const events: EventType<any>[] = [ready];
export default events;
