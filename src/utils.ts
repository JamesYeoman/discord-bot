import { Client, Message, MessageManager, MessageReference } from 'discord.js';
import { logger } from './main';

export const prettyPrintJson = <T>(obj: T) => JSON.stringify(obj, null, 2);

export const getAuthorID = (msg: Message) => {
  const tag = msg.author.tag;
  return Number.parseInt(tag.split('#')[1]);
};

export const people = {
  james_me: 4329,
  garbung: 1748,
  jess: 9543,
};

export const randomNum = (size: number) => Math.floor(Math.random() * size);

export const getQuotedMessage = async (ref: MessageReference, mgr: MessageManager) => {
  if (!ref.messageId) {
    throw 'No reference message ID';
  }

  return await mgr.fetch(ref.messageId);
};

export const boolifyString = (str: string) => !!str && str.length !== 0;

type channelInfo = { id: string; name: string };
export const getTextChannelById = async (client: Client, channel: channelInfo) => {
  const maybeChannel = await client.channels.fetch(channel.id);
  if (!maybeChannel) {
    throw `${channel.id} does not exist!`;
  }

  if (maybeChannel.type !== 'GUILD_TEXT') {
    throw `${channel.id} is not a text channel!`;
  }

  if (maybeChannel.name !== channel.name) {
    throw `${channel.id} is not the ${channel.name} channel!`;
  }

  return maybeChannel;
};
