function toUpper(call, callback) {
    console.log('Request received: ' + JSON.stringify(call));
    var { stringWithoutFormat } = call.request;
    callback(null, { stringWitFormat: stringWithoutFormat.toUpperCase() });
}

exports.toUpper = toUpper;