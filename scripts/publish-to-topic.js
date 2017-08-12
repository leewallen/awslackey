// Commands:
//   hubot publish topic email [topic ARN] [JSON message body - {"message":"my message","subject":"the subject"}]  - publishes message to topic.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    sns     = new aws.SNS(config);

module.exports = function(robot) {


    robot.respond(/(publish topic email|pubtopic email)\s([\:\-a-zA-Z0-9]+)\s(.*)/i, function(msg) {
        var topicarn = msg.match[2].toLowerCase(),
            message_json = msg.match[3];

        message_json = message_json.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
        var message_body = JSON.parse(message_json);

        return new promise(function(resolve, reject) {
            var params = {Message: message_body.message, TopicArn: topicarn, Subject: message_body.subject};
            console.log("Message params:", JSON.stringify(params));
            sns.publish(params, function(err, data) {
                if(err) {
                    reject(err);
                }
                
                resolve(data);
            });
        }).then(function(data) {
            msg.send("```" + "Message ID : " + data.MessageId + "\n" + "```");
        }).catch(function(e) {
            msg.send("```" + e + "```");
        });  
    });
};
