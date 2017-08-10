# awslackey
A slack bot with commands for interrogating your AWS environment

## Initial setup

### To run the slack bot, make sure you have coffee-script installed:
 npm install -g coffee-script 

### Install redis for redis-brain usage:
 brew install redis

### Add a bot to your Slack team


## Create a config.json file:
Create a config.json file that includes the region, access key, and secret key, for the role your bot uses for interacting with AWS via the SDK. Example for US West (Oregon):

{ 
    "region" : "us-west-2", 
    "accessKeyId" : "YOUR_ACCESS_KEY", 
    "secretAccessKey" : "YOUR_SECRET_ACCESS_KEY" 
}

## Start the bot by passing the hubot token that was created when you were first setting up the bot in slack:
 HUBOT_SLACK_TOKEN=xoxb-YOUR-TOKEN-HERE ./bin/hubot --adapter slack




