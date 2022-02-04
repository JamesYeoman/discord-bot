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

const getRepliedMsg = async (message: Message) => {
  if (getAuthorID(message) !== people.garbung || message.reference == null) {
    throw false;
  }
  return await getQuotedMessage(message);
};

const isAuthorMe = async (message: Message) => {
  if (!boolifyString(message.author.tag)) {
    throw 'Dafuq? No author tag?';
  }

  if (getAuthorID(message) !== people.james_me) {
    throw false;
  }
};

const event: EventType<'messageCreate'> = {
  name: 'messageCreate',
  once: false,
  execute: async (message: Message) => {
    try {
      const orig = await getRepliedMsg(message);
      const today = await isAuthorMe(orig).then(() => new Date().toDateString());
      const malded = await maldMutex.waitForUnlock().then(() => lastMalded === today);

      if (malded || randomNum(20) < 10) {
        await message.reply(maldGif).then(() => logger.info('Jack has been malded!'));
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
