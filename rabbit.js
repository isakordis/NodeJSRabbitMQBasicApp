var express = require('express');
var amqplib = require('amqplib/callback_api.js');
var model = require('./model/model');
var router = express.Router();

router.post('/', (req, res) => {
    console.log('POST INSIDE');
    amqplib.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'This is Test';
            var msg = 'new Message!';

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
            Model = new model({
                first: msg + 'test',
            });
            //MongoDB Saving Starting
            Model.save((err, data) => {
                if (!err) {
                    res.send(msg.toString());
                    console.log('RES DATA: ' + res.send(data));
                    res.end();
                } else {
                    console.log('____--------');
                    console.log('Error: ' + JSON.stringify(err, undefined, 2));
                }
            });
            //MongoDb Saving Ending
            console.log(" Send The Message:", msg);
        });
        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 500);

    });


});
module.exports = router;