const { Client, Intents } = require("discord.js");
const loader = require("./util/loader");

const client = new Client({ intents: Object.keys(Intents.FLAGS) });
Object.entries(require("./client"))
  .forEach(data => client[data[0]] = data[1]);
loader.commands(client);
loader.events(client);

client.login(client.config.auth.discord);
