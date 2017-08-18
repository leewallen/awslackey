// Commands:
//   hubot find instance [tag name] [tag value] - Finds instances based on tag values.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    ec2     = new aws.EC2(config);

module.exports = function(robot) {
    robot.respond(/(find instance|findinst) ([-\a-zA-Z0-9]+) ([-\a-zA-Z0-9]+)/i, function(msg) {
        var tagname = msg.match[2],
            tagvalue = msg.match[3],
            message  = "";

        var params = { Filters: 
            [
                {
                    Name:"tag-key", Values:[tagname]
                }
            ]
        };
        console.log(JSON.stringify(params));

        return new promise(function(resolve, reject) {
            ec2.describeInstances(params, function(err, data) {
                if(err) {
                    reject(err);
                }
                
                resolve(data);
            });
        }).then(function(data) {
            
            if (data.Reservations.length > 0 && data.Reservations[0].Instances.length > 0) {
                var instanceArrayLength = data.Reservations[0].Instances.length;
                if (instanceArrayLength > 0) {
                    message = message + "Instance IDs : \n";
                    var tagValueTest = new RegExp(tagvalue);
                    for (var i = 0; i < instanceArrayLength; i++) {
                        var instance = data.Reservations[0].Instances[i];

                        var arrayLength = instance.Tags.length;
                        for (var j = 0; j < arrayLength; j++) {
                            if (tagValueTest.test(instance.Tags[j].Value)) {
                                message = message + "\t" + instance.InstanceId + "\n";        
                            }
                        }
                    }
                } else {
                    message = "Unable to find any instances.";
                }
            } else {
                message = "Unable to find any instances.";
            }
			            
            msg.send("```" + message + "```");
        }).catch(function(e) {
            msg.send("```" + e + "```");
        });
    });
};