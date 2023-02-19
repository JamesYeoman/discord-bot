import { readFileSync } from 'fs';
import http from 'http';

import { Client } from 'discord.js';
import pino from 'pino';

import events from './events';
import handler from './misc/server';

export const logger = pino(
  { name: 'Discord Bot', timestamp: true },
  pino.transport({
    targets: [
      {
        target: 'pino/file',
        options: {
          destination: `./logs/discordbot.json`,
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

const server = http.createServer(handler(client));
server.listen(8080, () => {
  const conf = readFileSync(`./config.json`, 'utf-8');
  client.login(JSON.parse(conf).token);
  logger.info('Discord Client started!');
});
