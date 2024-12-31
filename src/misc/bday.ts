import type { RequestHandler } from '../types';

import { getTextChannelById, vlcMediaPlayer } from '../utils';

export const wishBirthday =
  (userID: string): RequestHandler =>
  async (client) => {
    const hentaiThread = await getTextChannelById(client, {
      id: vlcMediaPlayer.id,
      name: vlcMediaPlayer.name,
    });

    const guild = client.guilds.cache.get(vlcMediaPlayer.guild);
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
