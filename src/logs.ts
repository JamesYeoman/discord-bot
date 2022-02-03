const cwd = process.cwd();
const logPath = `${cwd}/log`;

export const tracePath = ['trace', `/var/log/discordbot/trace.log`];
export const debugPath = ['debug', `${logPath}/debug.log`];
export const infoPath = ['info', `${logPath}/info.log`];
export const warnPath = ['warn', `${logPath}/warn.log`];
export const errorPath = ['error', `${logPath}/error.log`];
