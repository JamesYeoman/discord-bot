import { IncomingMessage as IM, ServerResponse as SR } from 'http';

import { Client } from 'discord.js';

import { getTextChannelById } from '../utils';
import { vlcMediaPlayer } from './constants';

export const wishBirthday =
  (userID: string) => async (client: Client, req: IM, res: SR) => {
    const hentaiThread = await getTextChannelById(client, {
      id: vlcMediaPlayer.channelId,
      name: 'hentai-thread',
    });

    const guild = client.guilds.cache.get(vlcMediaPlayer.guildId);
    if (!guild) {
      throw new Error('Could not get the vlc media player guild');
    }

    const members = await guild.members.fetch();
    const member = members.find((m) => m.user.tag === userID);
    if (!member) {
      throw new Error(`Could not find ${userID} in vlc media player`);
    }

    hentaiThread.send(`Oi <@${member.id}>! Happy fucking birthday`);
  };
