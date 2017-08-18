# awslackey
A slack bot with commands for interrogating your AWS environment

## Initial setup

### To run the slack bot, make sure you have coffee-script installed:

```script
 npm install -g coffee-script 
```

### Install redis for redis-brain usage:

```script
 brew install redis
```

### Add a bot to your Slack team
Visit this link to add a new bot to your slack team: https://my.slack.com/services/new/bot

If you belong to multiple slack teams, then be sure to select the appropriate team from the drop down box in the upper right hand corner.

## Run the bot locally

### Create a config.json file:
Create a config.json file that includes the region, access key, and secret key, for the role your bot uses for interacting with AWS via the SDK. Example for US West (Oregon):

```json
{ 
    "region" : "us-west-2", 
    "accessKeyId" : "YOUR_ACCESS_KEY", 
    "secretAccessKey" : "YOUR_SECRET_ACCESS_KEY" 
}
```

### Start the bot by passing the hubot token that was created when you were first setting up the bot in slack:

```script
 HUBOT_SLACK_TOKEN=xoxb-YOUR-TOKEN-HERE ./bin/hubot --adapter slack
```



