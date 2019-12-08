function toUpperCase(call, callback) {
    console.log('Request received: ' + JSON.stringify(call.request));
    var { text } = call.request;
    var result  = { result : text.toUpperCase() };
    console.log('Response sent: ' + JSON.stringify(result));
    callback(null, result);
}

exports.toUpperCase = toUpperCase;