import { Client, Message, MessageManager, MessageReference } from 'discord.js';

import { faod, vlcmediaplayer as vlc } from './discord_ids.json';

export const prettyPrintJson = <T>(obj: T) => JSON.stringify(obj, null, 2);

export const getAuthorID = (msg: Message) => {
  const tag = msg.author.tag;
  return Number.parseInt(tag.split('#')[1]);
};

export const people = {
  james_me: 4329,
  jack: 1748,
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

export const vlcMediaPlayer = {
  id: vlc.channel.default.id,
  name: vlc.channel.default.name,
  guild: vlc.guild,
};

export const fatAndOrDangerous = {
  id: faod.channel.default.id,
  name: faod.channel.default.name,
  guild: faod.guild,
};

export const getHentaiThread = (client: Client) =>
  getTextChannelById(client, {
    id: vlcMediaPlayer.id,
    name: vlcMediaPlayer.name,
  });

export const getTestChannel = (client: Client) =>
  getTextChannelById(client, {
    id: fatAndOrDangerous.id,
    name: fatAndOrDangerous.name,
  });
