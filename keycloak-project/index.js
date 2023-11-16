var Keycloak = require('keycloak-connect');
var fs = require('fs');
var express = require('express')
var session = require('express-session');
var https = require('https');
var atob = require('atob');
const path = require('path');
var cors = require('cors');
 
const HOST = 'localhost';
const PORT = process.env.PORT || 3000;
const public = path.join(__dirname, 'public');
const whitelistedRoutes = ['/', '/upload'];
 
// HTTPS server settings
// var key = fs.readFileSync('./certificates/my-awesome-sauce-app-key.pem');
// var cert = fs.readFileSync('./certificates/my-awesome-sauce-app-cert.pem')
// var https_options = {
//     key: key,
//     cert: cert
// };
 
var memoryStore = new session.MemoryStore();
 
var keycloak = new Keycloak({
  store: memoryStore
});
 
var app = express();
 
var originsWhitelist = [
  'localhost'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  }
}
 
app.use(cors(corsOptions));
 
var sess = {
  secret: 'nadal federer djoker murray',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
  cookie: {
    secure: false,
  }
}
  
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
  
app.use(session(sess))
 
app.use(keycloak.middleware());
 
// Routes
app.get(whitelistedRoutes, keycloak.protect(), (req, res) => {
  res.sendFile('index.html', {
    root: __dirname + '/public'
  });
});
 
app.get('/logoff', keycloak.protect(), (req, res) => {
  console.log('logout clicked');
  // Due to CORS setup on the keycloak server, we can't call the /logout
  // route directly through the Angular client. We need to pass the URL
  // from the server (with CORS headers) and then call that URL from the client.
  // Reference: https://stackoverflow.com/questions/49835830/res-redirect-cors-not-working-in-mean-app
  res.send('https://' + HOST + '/logout');
});
 
// Statically serve the Angular frontend
app.use(express.static(public, {
  maxAge: '1h'
}), keycloak.protect(), (req, res) => {
  if (whitelistedRoutes.indexOf(req.originalUrl) == -1) {
    console.log(req.originalUrl + ': Invalid route!');
    res.sendStatus(404);
  }
});
 
server = https.createServer(https_options, app).listen(PORT, HOST)
console.log('HTTPS Server listening on %s:%s', HOST, PORT);