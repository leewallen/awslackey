// Commands:
//   hubot describe instance [instance_id] - Shows instance details.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    ec2     = new aws.EC2(config);

module.exports = function(robot) {
    robot.respond(/describe instance ([-\a-zA-Z0-9]+)/i, function(msg) {
        var instance = msg.match[1].toLowerCase(),
            message  = "";

        return new promise(function(resolve, reject) {
            ec2.describeInstances({ InstanceIds : [ instance ] }, function(err, instance) {
                if(err) {
                    reject(err);
                }
                //console.log("Success", JSON.stringify(instance));
                resolve(instance);
            });
        }).then(function(instance) {
            instance = instance.Reservations[0].Instances[0];

            message = message + "Instance type : " + instance.InstanceType + "\n";
            message = message + "Public IP     : " + instance.PublicIpAddress + "\n";
            message = message + "Private IP    : " + instance.PrivateIpAddress + "\n";
            message = message + "Public DNS    : " + instance.PublicDnsName + "\n";
            message = message + "Private DNS   : " + instance.PrivateDnsName + "\n";
			message = message + "Launch time   : " + instance.LaunchTime + "\n";
			message = message + "State         : " + instance.State.Name + "\n";
			message = message + "DeviceName    : " + instance.BlockDeviceMappings[0].DeviceName + "\n";

			message = message + "EBS AttachTime: " + instance.BlockDeviceMappings[0].Ebs.AttacheTime + "\n";
			message = message + "EBS DoT       : " + instance.BlockDeviceMappings[0].Ebs.DeleteOnTermination + "\n";
			message = message + "EBS Status    : " + instance.BlockDeviceMappings[0].Ebs.Status + "\n";
			message = message + "EBS Volume ID : " + instance.BlockDeviceMappings[0].Ebs.VolumeId + "\n";
            
            msg.send("```" + message + "```");
        }).catch(function(e) {
            msg.send("```" + e + "```");
        });
    });
};