import type { Client } from 'discord.js';

import { ChannelType } from 'discord.js';

import channels from './discord_ids.json' with { type: 'json' };

export const idDict = {
  http501: '153948164670357504',
};

type channelInfo = { id: string; name: string };
const getTextChannelById = async (client: Client, channel: channelInfo) => {
  const maybeChannel = await client.channels.fetch(channel.id);
  if (!maybeChannel) {
    throw `${channel.id} does not exist!`;
  }

  if (maybeChannel.type !== ChannelType.GuildText) {
    throw `${channel.id} is not a text channel!`;
  }

  return maybeChannel;
};

export const vlcMediaPlayer = {
  id: channels.vlcmediaplayer.channel.default.id,
  name: channels.vlcmediaplayer.channel.default.name,
  guild: channels.vlcmediaplayer.guild,
};

export const fatAndOrDangerous = {
  id: channels.faod.channel.default.id,
  name: channels.faod.channel.default.name,
  guild: channels.faod.guild,
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
