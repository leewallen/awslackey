// Commands:
//   hubot delete topic [topic ARN] - delete SNS topic.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    sns     = new aws.SNS(config);

module.exports = function(robot) {
    robot.respond(/(delete topic|deltopic) ([\:-\a-zA-Z0-9]+)/i, function(msg) {
            var topic = msg.match[2].toLowerCase(),
            message  = "";

        return new promise(function(resolve, reject) {
            sns.deleteTopic({ TopicArn : topic }, function(err, data) {
                if(err) {
                    reject(err);
                }
                console.log("Success", JSON.stringify(data));
                resolve(data);
            });
        }).then(function(data) {
            
            message =  data;
            
            msg.send("```" + message + "```");
        }).catch(function(e) {
            msg.send("```" + e + "```");
        });  
    });
};