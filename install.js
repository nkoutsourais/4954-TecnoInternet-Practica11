const { spawnSync } = require('child_process');

function exec(serviceName, command, cwd) {
    console.log(`Installing dependencies for [ ${serviceName} ]`);
    console.log(`Folder: ${cwd} Command: ${command} `);
    spawnSync(command, [], { cwd, shell: true, stdio: 'inherit' });
}
exec('externalservice', 'npm install', './External Service');
exec('server', 'npm install', './Server');
exec('client', 'npm install', './Client');
exec('worker', 'mvn install', './Worker/InterfaceGrpc');
exec('worker', 'mvn install', './Worker/Worker');