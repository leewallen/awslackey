// Commands:
//   hubot list subscriptions - lists SNS subscriptions.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    sns     = new aws.SNS(config);

module.exports = function(robot) {


    robot.respond(/(list subscriptions|listsubs|subscriptions)/i, function(msg) {
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
            var message = "";
            var arrayLength = data.Subscriptions.length;
            var nextToken = null;

// have script call a function with a callback that receives all the output
//            do {
                for (var i = 0; i < arrayLength; i++) {
                    if (i == 0) message = "Subscriptions:\n";
                    else message = message + "\n";
                    message = message + "ARN       : " + data.Subscriptions[i].SubscriptionArn + "\n";
                    message = message + "Owner     : " + data.Subscriptions[i].Owner + "\n";
                    message = message + "Protocol  : " + data.Subscriptions[i].Protocol + "\n";
                    message = message + "Endpoint  : " + data.Subscriptions[i].Endpoint + "\n";
                    message = message + "TopicArn  : " + data.Subscriptions[i].TopicArn + "\n";
                }
                nextToken = data.NextToken;
                console.log("nextToken : " + nextToken);
//                if (nextToken == null) console.log("nextToken is null");

//            } while (nextToken != null);

            msg.send("```" + message + "```");
        }).catch(function(e) {
            msg.send("```" + e + "```");
        });  
    });
};

