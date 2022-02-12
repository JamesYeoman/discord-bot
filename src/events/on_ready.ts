import { EventType } from '../events';
import { logger } from '../main';

const event: EventType<'ready'> = {
  name: 'ready',
  once: true,
  execute: () => {
    logger.info('Discord Client is ready!');
  },
};

export default event;
