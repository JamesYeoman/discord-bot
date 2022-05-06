import { Client } from 'discord.js';
import { IncomingMessage as IM, ServerResponse as SR } from 'http';
import { getTextChannelById } from 'src/utils';
import { vlcMediaPlayer } from './constants';

const californiaMp4 =
  'https://cdn.discordapp.com/attachments/244558372001677312/972100790388944946/today_is_friday_in_california.mp4';

export const california = async (client: Client, req: IM, res: SR) => {
  const hentaiThread = await getTextChannelById(client, {
    id: vlcMediaPlayer.channelId,
    name: 'hentai-thread',
  });

  hentaiThread.send(californiaMp4);
};
