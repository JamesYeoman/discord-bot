import { EventType } from 'src/events';
import { logger } from 'src/main';

const event: EventType<'ready'> = {
  name: 'ready',
  once: true,
  execute: () => {
    logger.info('Discord Client is ready!');
  },
};

export default event;
