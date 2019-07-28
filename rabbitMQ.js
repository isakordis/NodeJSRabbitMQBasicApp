var amqplib = require('./node_modules/amqplib/callback_api.js');


amqplib.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var msg = 'SAAS!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" Send The Message:", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});