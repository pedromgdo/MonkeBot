import {SlashCommandBuilder} from '@discordjs/builders';
import {putGlobalCommands, putGuildCommands} from './tools';

const commands = [
	new SlashCommandBuilder()
      .setName('monke')
      .setDescription('Sends Monke Pic.'),
	new SlashCommandBuilder()
      .setName('ooga')
      .setDescription('Replies with Booga!'),
	new SlashCommandBuilder()
      .setName('song')
      .addSubcommand(sc => sc
          .setName('banana')
          .setDescription('Links Banana Boat Song.')
      )
      .setDescription('Links a song.'),
  new SlashCommandBuilder()
      .setName('simp')
      .addUserOption(usr => usr
        .setName('simp')
        .setDescription('Who\'s the Simp?')
        .setRequired(true)
      )
      .setDescription('Calls someone out for being a SIMP.'),
  new SlashCommandBuilder()
      .setName('quote')
      .setDescription('Quotes someone.')
      .addSubcommand(cmd => cmd
        .setName('add')
        .addUserOption(usr => usr
          .setName('user')
          .setDescription('Who said the quote?')
          .setRequired(true)
        )
        .addStringOption(str => str
          .setName('quote')
          .setDescription('What is the quote?')
          .setRequired(true)
        )
        .setDescription('Adds a quote to someone.')
      )
      .addSubcommand(cmd => cmd
        .setName('user')
        .addUserOption(usr => usr
          .setName('user')
          .setDescription('Who to quote?')
          .setRequired(false)
        )
        .setDescription('Quotes someone.')
      )
      .setDescription('Quotes someone.')
];

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await putGlobalCommands(commands);
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await putGuildCommands(commands);
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();