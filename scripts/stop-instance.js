// Commands:
//   hubot stop instance [instance_id] - starts instance.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    ec2     = new aws.EC2(config);

module.exports = function(robot) {
    robot.respond(/(stop instance|stopinst) ([-\a-zA-Z0-9]+)/i, function(msg) {
        var instance = msg.match[2].toLowerCase(),
            message  = "";

        return new promise(function(resolve, reject) {
            ec2.stopInstances({ InstanceIds : [ instance ] }, function(err, instance) {
                if(err) {
                    reject(err);
                }
                
                resolve(instance);
            });
        }).then(function(instance) {
            instance = instance.StoppingInstances[0];

            message = message + "Instance ID   : " + instance.InstanceId + "\n";
            message = message + "Previous state: " + instance.PreviousState.Name + "\n";
            message = message + "Current state : " + instance.CurrentState.Name + "\n";
            
            msg.send("```" + message + "```");
        }).catch(function(e) {
            msg.send("```" + e + "```");
        });  
    });
};