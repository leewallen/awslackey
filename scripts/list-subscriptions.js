// Commands:
//   hubot list subscriptions - lists SNS subscriptions.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    sns     = new aws.SNS(config);

module.exports = function(robot) {


    robot.respond(/(list subscriptions|list subs)/i, function(msg) {
        //var nextToken = msg.match[2];

        return new promise(function(resolve, reject) {
            var params = {};
            console.log("Message params:", JSON.stringify(params));
            sns.listSubscriptions(params, function(err, data) {
                if(err) {
                    reject(err);
                }
                
                resolve(data);
            });
        }).then(function(data) {
            var message;
            var arrayLength = data.Subscriptions.length;
            for (var i = 0; i < arrayLength; i++) {
                message = message + "SubscriptionArn : " + data.Subscriptions[i].SubscriptionArn + "\n";
                message = message + "Owner           : " + data.Subscriptions[i].Owner + "\n";
                message = message + "Protocol        : " + data.Subscriptions[i].Protocol + "\n";
                message = message + "Endpoint        : " + data.Subscriptions[i].Endpoint + "\n";
                message = message + "TopicArn        : " + data.Subscriptions[i].TopicArn + "\n";
            }
            message = message + "NextToken       : " + data.NextToken + "\n";

            msg.send("```" + message + "```");
        }).catch(function(e) {
            msg.send("```" + e + "```");
        });  
    });
};
