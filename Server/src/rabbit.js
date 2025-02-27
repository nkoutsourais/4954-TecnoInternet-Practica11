const amqp = require('amqplib/callback_api');

const CONN_URL = 'amqp://guest:guest@localhost';

let ch = null;
var progress;

amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
      channel.consume("tasksProgress", function(msg) {
         //console.log("%s", msg.content.toString());
         progress = JSON.parse(msg.content);
      }, {
            noAck: true
      });
   });
});

module.exports.publishToQueue = async (taskLaunched) => {
   var data = { id: taskLaunched.id, text: taskLaunched.text }
   ch.sendToQueue("newTasks", Buffer.from(JSON.stringify(data)));
};

module.exports.consumeFromQueue = () => {
   return progress;
};

process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});