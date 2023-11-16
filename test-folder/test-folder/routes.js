const http = require('http');

var routes = {

    '/': function index(req, res) {
        res.writeHead(200);
        res.end('Hello its new year!');
    },

    '/foo': function foo(req, res) {
        res.writeHead(200)
        res.end('I know that already');

    }
}

http.createServer((request, response) => {
    debugger;
    if (request.url in routes) {
        return routes[request.url](request, response);
    }
    response.writeHead(404);
    response.end(http.STATUS_CODES[404]);

    debugger;
}).listen(3000);