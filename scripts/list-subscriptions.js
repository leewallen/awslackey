// Commands:
//   hubot list subscriptions | listsubs | subscriptions | subs - lists SNS subscriptions.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    sns     = new aws.SNS(config),
    message = "";

module.exports = function(robot) {

    robot.respond(/(list subscriptions|listsubs|subscriptions|subs)/i, function(msg) {
        listSubscriptions({}, msg);
    });

};

var listSubscriptions = function listSubscriptions(params, msg) { 
    sns.listSubscriptions(params, function(err, data) { 
        if (err) {
            console.log(err, err.stack);
            reject(err);
        } else { 
            var arrayLength = data.Subscriptions.length;
        
            for (var i = 0; i < arrayLength; i++) {
                if (i > 0) message += "\n";
                message += "ARN      : " + data.Subscriptions[i].SubscriptionArn + "\n";
                message += "Owner    : " + data.Subscriptions[i].Owner + "\n";
                message += "Protocol : " + data.Subscriptions[i].Protocol + "\n";
                message += "Endpoint : " + data.Subscriptions[i].Endpoint + "\n";
                message += "TopicArn : " + data.Subscriptions[i].TopicArn + "\n";
            }

            if (data.NextToken) {
                message += "\n"; 
                params.NextToken = data.NextToken; 
                listSubscriptions(params, msg); 
            } else {
                if (message) msg.send("```" + message + "```");
            } 
        } 
    }); 
}

