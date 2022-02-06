import { react } from './tools';
require('dotenv').config(); //initialize dotenv
import { Client, Intents} from 'discord.js';
import * as handler from './commandHandler';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user!.tag}!`);
  client.user!.setActivity("with Banana 🍌");

  // const guild = client.guilds.cache.get(process.env.GUILD_ID);

  // This takes ~1 hour to update
  // client.application.commands.set([]);

  // This updates immediately
  // guild?.commands.set([]);
});

// User sends a command
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  switch (interaction.commandName) {
    case 'monke':
      await handler.handleMonke(interaction);
      break;
    case 'ooga':
      await handler.handleOoga(interaction);
      break;
    case 'song':
      await handler.handleSong(interaction);
      break;
    case 'simp':
      await handler.handleSimp(interaction);
      break;
    case 'quote':
      await handler.handleQuote(interaction);
      break;
    default:
      console.log(`Command ${interaction.commandName} not found!`)
      break;
  }
});

// A user replies
client.on('messageCreate', async message => {
  console.log('User sent message: ' + message.content);
  await react(["ape", "monke", "macaco"], '🐒', message);
  await react(["banana"], '🍌', message);
})

client.login(process.env.CLIENT_TOKEN!); //login bot using token