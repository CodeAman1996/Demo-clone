require('dot-env');

const http = require('http');

function index(request, response) {
    response.writeHead(200);
    response.end('Hello, World!');
}

http.createServer((request, response) => {
    debugger;
    if (request.url === '/') {
        return index(request, response)
    }
    response.writeHead(404);
    response.end(http.STATUS_CODES[404]);

    debugger;
}).listen(3000);