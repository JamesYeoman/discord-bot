import { Message } from 'discord.js';

export const getAuthorID = (msg: Message) =>
  Number.parseInt(msg.author.tag.split('#')[1]);

export const people = {
  james_me: 4329,
  garbung: 1748,
};

export const randomNum = (size: number) => Math.floor(Math.random() * size);

export const getQuotedMessage = async (msg: Message) => {
  if (!msg.reference) {
    throw false;
  }

  if (!msg.reference.messageId) {
    throw 'No reference message ID';
  }

  return await msg.channel.messages.fetch(msg.reference.messageId);
};

export const boolifyString = (str: string) => !!str && str.length !== 0;
