import { httpGet, readFile, writeFile} from './tools';
require('dotenv').config(); //initialize dotenv
import { CacheType, CommandInteraction, MessageAttachment, MessageEmbed, User } from 'discord.js';
import * as Canvas from 'canvas';

const options = {
  hostname: 'api.monkedev.com',
  path: '/attachments/monkey?key=' + process.env.MONKE_API_KEY!,
  port: 443,
  method: 'GET'
}
/**
 * Sends an image of a monke as an embed.
 * @param interaction The interaction to act upon.
 */
export async function handleMonke(interaction: CommandInteraction<CacheType>) {
  await interaction.deferReply();
  await httpGet(options, async str => {
    var embed = new MessageEmbed().setImage(JSON.parse(str).url);
    await interaction.editReply({ content: "Here is Monke:", embeds: [embed] });
  })
}
/**
 * Tests the ping of the bot.
 * @param interaction The interaction to act upon.
 */
export async function handleOoga(interaction: CommandInteraction<CacheType>) {
  await interaction.reply("Booga!");
}
/**
 * Sends the link to the banana boat song.
 * @param interaction The interaction to act upon.
 */
export async function handleSong(interaction: CommandInteraction<CacheType>) {
  if (interaction.options.getSubcommand() === 'banana')
    await interaction.reply("https://www.youtube.com/watch?v=4iIFK9sZN_E");
}
/**
 * Reminds someone that they are simping, by sending them a direct message with a customized simp card.
 * @param interaction The interaction to act upon.
 */
export async function handleSimp(interaction: CommandInteraction<CacheType>) {
  await interaction.deferReply();
  let user = interaction.options.getUser('simp', true);
  await user.send({ content: `Why you always simpin\' ${user}?` });
  let canvas = Canvas.createCanvas(700, 300);
  let context = canvas.getContext("2d");
  let avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
  const simpCard = await Canvas.loadImage('./images/simp_card.jpg');
  context.drawImage(simpCard, 0, 0, canvas.width, canvas.height);
  context.drawImage(avatar, 45, 45, 200, 200);
  let attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
  await user.send({ files: [attachment] });
  await interaction.editReply({ content: `${user} has been notified of their simping!` });
}
/**
 * Logic to add or get a quote from someone.
 * @param interaction The interaction to act upon.
 */
export async function handleQuote(interaction: CommandInteraction<CacheType>) {
  if (interaction.inGuild() == false) return;
  await interaction.deferReply();
  switch (interaction.options.getSubcommand()) {
    case 'add':
      await handleQuoteAdd(interaction);
      break;
    case 'user':
      await handleQuoteUser(interaction);
      break;
    default:
      console.log(`Unknown interaction option: ${interaction.options.getSubcommand()}`)
      break;
  }
}
/**
 * Add a quote.
 * @param interaction The interaction to act upon.
 */
async function handleQuoteAdd(interaction: CommandInteraction<CacheType>){
  let user : User = interaction.options.getUser('user',true);
  let quote = interaction.options.getString('quote',true);
  var data = await readFile(`./data/${interaction.guildId}.json`);
  if(!data[user.id]) data[user.id]=[];
  data[user.id].push({quote:quote,username:user.username});
  await writeFile(`./data/${interaction.guildId}.json`,data);
  await interaction.editReply(`Added Quote:\n"*${quote}*" by ${user.username}`);
}
/**
 * Get a quote.
 * @param interaction The interaction to act upon.
 */
async function handleQuoteUser(interaction: CommandInteraction<CacheType>){
  let user : User | null = interaction.options.getUser('user',false);
  var data = await readFile(`./data/${interaction.guildId}.json`);
  if(user != null){
    if(!data[user.id] || data[user.id].length == 0) await interaction.editReply(`No quotes from ${user.username}!`);
    else {
      var quoteId = Math.floor(Math.random() * data[user.id].length);
      await interaction.editReply(`"*${data[user.id][quoteId].quote}*" by ${data[user.id][quoteId].username}`);
    }
  }else{
    if(data.length == 0) await interaction.editReply(`No quotes available!`);
    else {
      var keys = Object.keys(data);
      var userId = keys[Math.floor(Math.random() * keys.length)];
      var quoteId = Math.floor(Math.random() * data[userId].length);
      await interaction.editReply(`"*${data[userId][quoteId].quote}*" by ${data[userId][quoteId].username}`);
    }
  }
}