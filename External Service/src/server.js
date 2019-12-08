const grpc = require('grpc');
const UpperService = require('./interface');
const UpperServiceImpl = require('./upperService');

const server = new grpc.Server();

server.addService(UpperService.service, UpperServiceImpl);

server.bind('127.0.0.1:9090', grpc.ServerCredentials.createInsecure());

console.log('gRPC server running at http://127.0.0.1:9090');

server.start();