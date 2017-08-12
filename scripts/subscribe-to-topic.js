// Commands:
//   hubot subscribe to topic [topic ARN] [email address] - starts instance.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    sns     = new aws.SNS(config);

module.exports = function(robot) {


    robot.respond(/(subscribe to topic email|subtopic email)\s([\:\-a-zA-Z0-9]+)\s([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)/i, function(msg) {
        var topicarn = msg.match[2].toLowerCase(),
            endpoint = msg.match[3],
            protocol = "email";

	    var arrayLength = msg.match.length;
	    for (var i = 0; i < arrayLength; i++) {
	       console.log(msg.match[i]);
	    }

        return new promise(function(resolve, reject) {
            var params = {Protocol: protocol, TopicArn: topicarn, Endpoint: endpoint};
            sns.subscribe(params, function(err, data) {
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

