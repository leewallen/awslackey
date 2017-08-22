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

## Sample Command Usage:
* [findinst](#findinst)
* [descinst](#descinst)
* [startinst](#startinst)
* [stopinst](#stopinst)
* [create topic](#createtopic)


### findinst
_**findinst | find instance**_

Find EC2 instances using the "findinst" or "find instance" command by passing a tag name and a regex value for the tag value. A response listing the EC2 instance IDs and the current state will be returned. 

If you have two instances with "aws" in the name, with one instance stopped and the other instance running, then a response like the following will be returned:

```script
 findinst Name aws
```

```script
 my-aws-instance-1 : i-0a1b2c3d4e5f : stopped
 my-aws-instance-2 : i-9a8b7c6d5e4f : running
```

### descinst
_**descinst | describe instance**_

List information about a specific EC2 instance using the "descinst" or "describe instance" command by passing the EC2 instance ID:

```script
 descinst i-0a1b2c3d4e5f
```
The name, state, EBS volume info, tags, etc will be returned for any valid EC2 instance ID.


### startinst
_**startinst|start instance**_

Start a stopped EC2 instance using the "startinst" or "start instance" command by passing the EC2 instance ID:

```script
 startinst i-a1b2c3d4e5f6
```
The previous and current state of the EC2 instance will be returned.

```script
 Instance ID   : i-a1b2c3d4e5f6
 Previous state: stopped
 Current state : pending
```

### stopinst
_**stopinst|stop instance**_

Stop a running EC2 instance using the "stopinst" or "stop instance" command by passing the EC2 instance ID:

```script
 stopinst i-a1b2c3d4e5f6
```
The previous and current state of the EC2 instance will be returned.

```script
 Instance ID   : i-a1b2c3d4e5f6
 Previous state: running
 Current state : stopping
```

### create topic
_**crtopic | create topic**_

Create an SNS topic using the "create topic" or "crtopic" command by passing the topic name:

```script
 create topic my-sns-topic
```
The reply will be the SNS ARN:

```script
 TopicArn : arn:aws:sns:us-west-2:012345678901:my-sns-topic
```

### delete topic
_**deltopic | delete topic**_

Delete an SNS topic using the "delete topic" or "deltopic" command by passing the topic ARN:

```script
 delete topic arn:aws:sns:us-west-2:012345678901:my-sns-topic
```
The reply will be the request ID:

```script
 Request ID : a1b2c3d4-a1b2-c3d4-e5f6-a1b2c3d4e5f6
```

