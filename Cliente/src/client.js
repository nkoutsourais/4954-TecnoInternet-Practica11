const WebSocket = require('ws');
var Client = require('node-rest-client').Client;
var client = new Client();

let socket = new WebSocket("ws://localhost:8080/");

socket.on('open', function (e) {
    console.log("WebSocket connection established");

    var args = {
        data: { text: "hello" },
        headers: { "Content-Type": "application/json" }
    };
     
    client.post("http://localhost:8080/tasks", args, function (data, response) {
        console.log(data);
    });
});

socket.on('message', function (data) {
    console.log(`[message] Data received from server: ${data}`);
});

socket.on('close', function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        console.log('[close] Connection died');
    }
});

socket.on('error', function (error) {
    console.log(`[error] ${error.message}`);
});