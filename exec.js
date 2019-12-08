const { spawn } = require('child_process');

function exec(serviceName, command, cwd) {
    console.log(`Stated service [ ${serviceName} ]`);
    let cmd = spawn(command, [], { cwd, shell: true });
    cmd.stdout.on('data', function (data) {
        process.stdout.write(`[ ${serviceName} ] ${data} `);
    });
    cmd.stderr.on('data', function (data) {
        process.stderr.write(`[ ${serviceName} ] ${data} `);
    });
}
exec('externalservice', 'node src/server.js', './External Service');
exec('worker', 'mvn spring-boot:run', './Worker/Worker');
exec('server', 'node src/server.js', './server');
exec('client', 'node src/client.js', './client');