import { ChannelType, Client, Message } from 'discord.js';

import { faod, vlcmediaplayer as vlc } from './discord_ids.json';

export const getAuthorID = (msg: Message) => {
  const tag = msg.author.tag;
  return Number.parseInt(tag.split('#')[1]);
};

export const people = {
  james_me: 4329,
  jack: 1748,
  jess: 9543,
};

type channelInfo = { id: string; name: string };
export const getTextChannelById = async (client: Client, channel: channelInfo) => {
  const maybeChannel = await client.channels.fetch(channel.id);
  if (!maybeChannel) {
    throw `${channel.id} does not exist!`;
  }

  if (maybeChannel.type !== ChannelType.GuildText) {
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
