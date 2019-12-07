var express = require('express');
var app = express();
app.use(express.json());
var expressWs = require('express-ws')(app);
const uuidv1 = require('uuid/v1');
const rabbit = require('./rabbit.js');

var taskLaunched;

class TaskUpper {
    constructor(id, text) {
      this.id = id;
      this.text = text;
    }
  }

app.get('/tasks/:taskId', function (req, res) {
    if(!taskLaunched || req.params.taskId != taskLaunched.id) {
        res.status(404);
        res.end();
        return;
    }
    res.json(rabbit.consumeFromQueue());
    res.end();
});

app.post('/tasks', function (req, res) {
    if(taskLaunched) {
        res.status(403).send({ error: 'Only one task!' });
        res.end();
        return;
    }
    taskLaunched = new TaskUpper(uuidv1(), req.body.text);
    rabbit.publishToQueue(taskLaunched);
    res.json(taskLaunched);
    res.end();
});

app.ws('/notifications', function (ws, req) {

    console.log('User connected');

    ws.on('message', function (msg) {
        console.log('Message received:' + msg);
    });

    setInterval(()=>{
        ws.send(rabbit.consumeFromQueue());
    }, 1000);

});

app.listen(8080);