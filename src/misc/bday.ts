import type { RequestHandler } from '../types.js';

import { getHentaiThread, vlcMediaPlayer } from '../utils.js';

export const wishBirthday =
  (userID: string): RequestHandler =>
  async (client) => {
    const hentaiThread = await getHentaiThread(client);

    const guild = client.guilds.cache.get(vlcMediaPlayer.guild);
    if (!guild) {
      throw new Error('Could not get the vlc media player guild');
    }

    const members = await guild.members.fetch();
    const member = members.find((m) => m.user.id === userID);
    if (!member) {
      throw new Error(`Could not find user with ID "${userID}" in vlc media player`);
    }

    await hentaiThread.send(`Oi <@${userID}>! Happy birthday`);
  };
