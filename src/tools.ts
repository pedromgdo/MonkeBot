import * as https from 'https';
require('dotenv').config(); //initialize dotenv
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { EmojiIdentifierResolvable, Message } from 'discord.js';
import { SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import * as fs from 'fs';

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN!);


export async function httpGet(options: string | https.RequestOptions | URL, callback : (str : any) => void) {
  var req = await https.request(options, res => {
    let str: string = '';

    res.on('data', function (chunk) {
      str += chunk;
    });
    res.on('error', error => {
      console.error(error)
    });
    res.on('close', async () => {
      await callback(str);
    })
  })
  req.end();
  return req;
}
export async function react(words : string[], emoji : EmojiIdentifierResolvable, message : Message<boolean>) {
  if (message.author.bot == false) {
    words.forEach(async word => {
      if (message.content.toLowerCase().includes(word)) {
        await message.react(emoji);
        return true;
      }
    });
  }
  return false;
}
export async function readFile(path : string){
  try{
    return JSON.parse(fs.readFileSync(path,'utf8'));
  }catch{
    return JSON.parse('{}');
  }
}
export async function writeFile(path : string, content : string){
  fs.writeFile(path, JSON.stringify(content),  function(err) {
    if (err) {
      console.error(err);
    }
});
}
export async function putGuildCommands(commands : SlashCommandSubcommandsOnlyBuilder[]) {
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
    { body: commands },
  );
}
export async function putGlobalCommands(commands : SlashCommandSubcommandsOnlyBuilder[]) {
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID!),
    { body: commands },
  );
}