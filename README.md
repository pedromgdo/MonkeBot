# MonkeBot
A discord bot with fun features.

# Requirements
* [Node.js](https://nodejs.org/en/)

# Running
If you're not on the src directory, make sure to go there before running any commands.
1. Navigate to the src directory using the following command:
* ```cd src```

## Setup
1. Setup all the node modules required for the program to run:
* ```npm i```

2. Copy the [.env_example](src/.env_example) file and name it *.env* and fill in the required information:
* ```cp .env_example .env```

## Starting the Bot
1. Run the bot:
* ```npx ts-node index.ts```

## Reloading commands
Global commands take a while before being updated, thus guilds commands are used until the global commands are ready, once ready, restart the bot and the commands should update.

It's important to run reload commands after running the bot when running for the first time, since the bot clears guild commands when it runs to avoud duplicate commands.

1. Reload the bot commands:
* ```npx ts-node reloadCommands.ts```

# Features
You can find more information about the bot's features [here](src).

# License
Released under the [MIT](LICENSE) license.
