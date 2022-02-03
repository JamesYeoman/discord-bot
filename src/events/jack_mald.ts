import { Mutex } from 'async-mutex';
import { Message } from 'discord.js';
import { logger } from '../main';
import { getAuthorID, people, randomNum, getQuotedMessage } from '../utils';
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
  if (!message.author.tag || message.author.tag.length === 0) {
    throw 'Dafuq? No author tag?';
  }

  if (getAuthorID(message) !== people.james_me) {
    throw false;
  }
};

const maldedToday = () => lastMalded === new Date().toDateString();
const shouldMald = async () => {
  const malded = await maldMutex.waitForUnlock().then(maldedToday);
  return malded || randomNum(20) < 10;
};

const event: EventType<'messageCreate'> = {
  name: 'messageCreate',
  once: false,
  execute: async (message: Message) => {
    try {
      const orig = await getRepliedMsg(message);
      const today = await isAuthorMe(orig).then(() => new Date().toDateString());
      const should = await shouldMald();

      if (should) {
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
