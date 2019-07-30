var amqplib = require('amqplib/callback_api.js');
var Model = require('./model/model');
var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {



    amqplib.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'This is Test';
            var msg = 'new Message! testing  : '+ Math.random();

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(msg));

            channel.consume(queue, function (msg) {
                console.log('Consumer Inside');
                var mymm = msg.content.toString();
                console.log("MyMessage:" + mymm);
                var model = new Model({

                    modelMessage: mymm,

                });
                model.save((err, mymm) => {
                    if (!err) {
                        console.log('Save inside');
                        mymm = msg.content.toString();
                        console.log('MYMM:' + mymm);
                        res.send(mymm);
                    } else {
                        console.log('Error:' + JSON.stringify(err, undefined, 2));
                    }
                });
            }, {
                    noAck: true
                });

            

        });
        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 500);

    });

});
module.exports = router;