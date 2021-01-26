const http = require('http');
const app = require('./app');

class Server {

    constructor() {
        this.port = this.normalizePort(process.env.PORT || 3000);
        this.init();
    }

    normalizePort = val => {
        const port = parseInt(val, 10);
        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }

    errorHandler = error => {
        if (error.syscall !== listen) {
            throw error
        };
        const address = server.address();
        const bind = typeof adress === 'string' ? 'pipe' + address : 'port:' + this.port;
        switch (error.code) {
            case 'EACCES':
                console.error(bind + 'requires elevated privileges.');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use.');
                process.exit(1);
                break;
            default:
                throw error;
        }
    };

    init = () => {
        app.set('port', this.port);
        const server = http.createServer(app);
        server.on('error', this.errorHandler);
        server.on('listening', () => {
            const address = server.address();
            const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + this.port;
            console.log('Listening on ' + bind);
        })
        server.listen(this.port);
    }
}

const server = new Server;