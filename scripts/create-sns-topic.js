// Commands:
//   hubot create topic [topic name] - create SNS topic.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    sns     = new aws.SNS(config);

module.exports = function(robot) {
    robot.respond(/(create topic|crtopic) ([-\a-zA-Z0-9]+)/i, function(msg) {
            var topic = msg.match[2].toLowerCase(),
            message  = "";

        return new promise(function(resolve, reject) {
            sns.createTopic({ Name : topic }, function(err, data) {
                if(err) {
                    reject(err);
                }
                
                resolve(data);
            });
        }).then(function(data) {
            
            message =  "TopicArn : " + data.TopicArn + "\n";
            
            msg.send("```" + message + "```");
        }).catch(function(e) {
            msg.send("```" + e + "```");
        });  
    });
};