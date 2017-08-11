// Commands:
//   hubot describe instance [instance_id] - Shows instance details.
//

var config  = require(__dirname + '/../config.json'),
    promise = require('bluebird'),
    aws     = require('aws-sdk'),
    ec2     = new aws.EC2(config);

module.exports = function(robot) {
    robot.respond(/(describe instance|descinst) ([-\a-zA-Z0-9]+)/i, function(msg) {
        var instance = msg.match[2].toLowerCase(),
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
            message = message + "KeyName       : " + instance.KeyName + "\n";
            message = message + "Monitoring    : " + instance.Monitoring.State + "\n";
            message = message + "AZ            : " + instance.Placement.AvailabilityZone + "\n";
            message = message + "Public IP     : " + instance.PublicIpAddress + "\n";
            message = message + "Public DNS    : " + instance.PublicDnsName + "\n";
            message = message + "Private IP    : " + instance.PrivateIpAddress + "\n";
            message = message + "Private DNS   : " + instance.PrivateDnsName + "\n";
			message = message + "Launch time   : " + instance.LaunchTime + "\n";
			message = message + "State         : " + instance.State.Name + "\n";
            message = message + "RootDeviceName: " + instance.RootDeviceName + "\n";
            message = message + "RootDeviceType: " + instance.RootDeviceType + "\n";

            var arrayLength = instance.BlockDeviceMappings.length;
            for (var i = 0; i < arrayLength; i++) {
                message = message + "EBS DeviceName: " + instance.BlockDeviceMappings[i].DeviceName + "\n";
                message = message + "EBS AttachTime: " + instance.BlockDeviceMappings[i].Ebs.AttachTime + "\n";
                message = message + "EBS DoT       : " + instance.BlockDeviceMappings[i].Ebs.DeleteOnTermination + "\n";
                message = message + "EBS Status    : " + instance.BlockDeviceMappings[i].Ebs.Status + "\n";
                message = message + "EBS Volume ID : " + instance.BlockDeviceMappings[i].Ebs.VolumeId + "\n";
            }


            var arrayLength = instance.Tags.length;
            for (var i = 0; i < arrayLength; i++) {
                message = message + "Tag Key       : " + instance.Tags[i].Key + "\n";
                message = message + "Tag Value     : " + instance.Tags[i].Value + "\n";
            }
			            
            msg.send("```" + message + "```");
        }).catch(function(e) {
            msg.send("```" + e + "```");
        });
    });
};