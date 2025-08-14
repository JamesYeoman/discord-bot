import type { EventType } from '../types.js';

const event: EventType<'ready'> = {
  name: 'ready',
  once: true,
  execute: () => {
    console.info('Discord Client is ready!');
  },
};

export default event;
