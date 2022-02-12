import { Mutex } from 'async-mutex';
import { Message } from 'discord.js';
import { logger } from '../main';
import {
  getAuthorID,
  people,
  randomNum,
  getQuotedMessage,
  boolifyString,
} from '../utils';
import { EventType } from './index';

const maldGif = 'https://tenor.com/view/jack-jack-malding-angry-ginger-rant-gif-22379466';
const maldMutex = new Mutex();
let lastMalded = 'never';

const shouldMald = (malded: boolean) => {
  // if (malded) {
  //   return false;
  // }

  // return randomNum(20) >= 10

  return true;
}

const event: EventType<'messageCreate'> = {
  name: 'messageCreate',
  once: false,
  execute: async (message: Message) => {
    if (getAuthorID(message) !== people.garbung) {
      return;
    }

    if (message.reference == null) {
      return;
    }

    const ref = message.reference;

    if (!ref.messageId) {
      return
    }

    try {
      const orig = await message.channel.messages.fetch(ref.messageId);
      if (getAuthorID(orig) !== people.james_me) {
        return;
      }

      const today = new Date().toDateString();
      const malded = await maldMutex.waitForUnlock().then(() => lastMalded === today);
      if (shouldMald(malded)) {
        await message.reply(maldGif);
        logger.info('Jack has been malded!');

        await message.channel.send('Better luck next time, bruh');
        await maldMutex.acquire().then((release) => {
          lastMalded = today;
          release();
        });
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
