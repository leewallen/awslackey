// Commands:
//   hubot list topics - list SNS topics.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    sns     = new aws.SNS(config);

module.exports = function(robot) {
    robot.respond(/(list topics|topics)/i, function(msg) {
        var message  = "";

        return new promise(function(resolve, reject) {
            sns.listTopics(null, function(err, data) {
                if(err) {
                    reject(err);
                }
                
                resolve(data);
            });
        }).then(function(data) {
            
            var arrayLength = data.Topics.length;
            for (var i = 0; i < arrayLength; i++) {
                message = message + "TopicArn : " + data.Topics[i].TopicArn + "\n";
            }
            
            msg.send("```" + message + "```");
        }).catch(function(e) {
            msg.send("```" + e + "```");
        });  
    });
};