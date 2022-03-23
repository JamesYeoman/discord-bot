import { Message } from 'discord.js';
import { getAuthorID, people } from '../utils';
import { EventType } from './index';

const event: EventType<'messageCreate'> = {
  name: 'messageCreate',
  once: false,
  execute: async (message: Message) => {
    if (getAuthorID(message) !== people.garbung) {
      return;
    }

    if (
      message.content.includes("we don't care") ||
      message.content.includes('we do not care')
    ) {
      message.reply('https://tenor.com/view/persona-typing-ok-cope-gif-22890434');
    }
  },
};

export default event;
