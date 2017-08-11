// Commands:
//   hubot subscribe to topic [topic ARN] [email|email-json] [email address] - starts instance.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    sns     = new aws.SNS(config);

module.exports = function(robot) {


    robot.respond(/(subscribe to topic email|subtopic email)\s([\:\-a-zA-Z0-9]+)\s(email|email-json)\s([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)/i, function(msg) {
        var topicarn = msg.match[2].toLowerCase(),
            protocol = msg.match[3],
            endpoint = msg.match[4],
            message  = "";

	    var arrayLength = msg.match.length;
	    for (var i = 0; i < arrayLength; i++) {
	       console.log(msg.match[i]);
	    }

        return new promise(function(resolve, reject) {
            sns.subscribe({ Protocol: protocol, TopicArn: topicarn, Endpoint: endpoint}, function(err, data) {
                if(err) {
                    reject(err);
                }
                
                resolve(data);
            });
        }).then(function(data) {
            msg.send("```" + "Subscription ARN : " + data.SubscriptionArn + "\n" + "```");
        }).catch(function(e) {
            msg.send("```" + e + "```");
        });  
    });
};

