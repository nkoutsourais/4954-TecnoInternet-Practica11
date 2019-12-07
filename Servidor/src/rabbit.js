const amqp = require('amqplib/callback_api');

const CONN_URL = 'amqp://guest:guest@localhost';

let ch = null;
var progress;

amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
      channel.consume("updatetask", function(msg) {
         console.log("%s", msg.content.toString());
         progress = msg.content.toString();
      }, {
            noAck: true
      });
   });
});

module.exports.publishToQueue = async (taskLaunched) => {
    ch.sendToQueue("createtask", Buffer.from(taskLaunched.text));
};

module.exports.consumeFromQueue = () => {
   return progress;
};

process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});