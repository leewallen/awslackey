# awslackey
A slack bot with commands for interrogating your AWS environment

To run the slack bot, make sure you have coffee-script installed:
npm install -g coffee-script 

Install redis for redis-brain usage:
brew install redis

Start the bot by passing the hubot token that was created when you were first setting up the bot in slack:

HUBOT_SLACK_TOKEN=xoxb-YOUR-TOKEN-HERE ./bin/hubot --adapter slack


