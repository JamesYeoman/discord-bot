import { Client } from 'discord.js';
import pino from 'pino';
import { readFileSync } from 'fs';
import events from './events';

export const logger = pino(
  { name: 'Discord Bot', timestamp: true },
  pino.transport({
    targets: [
      {
        target: 'pino/file',
        options: { 
          // destination: '/home/debian/logs/discordbot.json'
          destination: './discordbot.json'
        },
        level: 'trace',
      },
      { target: 'pino-pretty', options: { destination: 1 }, level: 'trace' },
    ],
  }),
);

logger.info('Bot is starting...');
const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
  partials: ['MESSAGE', 'CHANNEL'],
});

for (const event of events) {
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const conf = readFileSync('./config.json', 'utf-8');
client.login(JSON.parse(conf).token);
