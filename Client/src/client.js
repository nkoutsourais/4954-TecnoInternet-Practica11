const WebSocket = require('ws');
var RestClient = require('node-rest-client').Client;

let socket = new WebSocket("ws://localhost:8080/notifications");

socket.on('open', function (e) {
    console.log("WebSocket connection established");
});

socket.on('message', function (data) {
    console.log(`Data received from server: ${data}`);
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

function newTask() {
    var args = {
        data: { text: "quiero este texto en mayusculas" },
        headers: { "Content-Type": "application/json" }
    };
    
    var client = new RestClient();
    client.post("http://localhost:8080/tasks", args, function (data, response) {
        console.log("Result API POST /tasks/");
        console.log(data);
    });
};

setTimeout(newTask, 1000);