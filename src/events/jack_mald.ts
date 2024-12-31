import { logger } from '../main';
import { getAuthorID, people } from '../utils';
import { EventType } from './index';

const maldGif = 'https://tenor.com/view/jack-jack-malding-angry-ginger-rant-gif-22379466';

const shouldMald = () => {
  // Random number between 0 and 1
  return Math.random() > 0.7;
};

const event: EventType<'messageCreate'> = {
  name: 'messageCreate',
  once: false,
  execute: async (message) => {
    if (getAuthorID(message) !== people.jack) {
      return;
    }

    if (!message.reference?.messageId) {
      return;
    }

    try {
      const orig = await message.channel.messages.fetch(message.reference.messageId);
      if (getAuthorID(orig) !== people.james_me) {
        return;
      }

      if (shouldMald()) {
        await message.reply(maldGif);
        logger.info('Jack has been malded!');

        await message.channel.send('Better luck next time, bruh');
      }
    } catch (e) {
      if (e) {
        logger.error(e);
      }

      return;
    }
  },
};

export default event;
