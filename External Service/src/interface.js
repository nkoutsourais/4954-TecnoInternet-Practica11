const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(__dirname + '/../UpperService.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var upperServiceProto = grpc.loadPackageDefinition(packageDefinition);

module.exports = upperServiceProto.es.practica11.interfaces.grpc.UpperService;