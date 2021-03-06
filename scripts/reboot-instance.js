// Commands:
//   hubot reboot instance [instance_id] - reboot instance.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    ec2     = new aws.EC2(config);

module.exports = function(robot) {
    robot.respond(/(reboot instance|rebootinst) ([-\a-zA-Z0-9]+)/i, function(msg) {
        var instance = msg.match[2].toLowerCase(),
            message  = "";
        var params = {
          InstanceIds: [ /* required */
            instance
          ]
        };
        ec2.rebootInstances(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });
    });
};