import { Client, Intents } from 'discord.js';
import pino from 'pino';

const transport = pino.transport({
  target: 'pino/file',
  options: { destination: '/var/log/discordbot.json' },
});

const logger = pino(transport);

logger.info('Bot is starting...');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

logger.debug(client);
