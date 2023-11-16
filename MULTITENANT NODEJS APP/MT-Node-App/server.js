const express = require('express');
const bodyParser = require('body-parser');
const tenant = require('./src/model/commondb');
const { connectAllDb } = require('./Utils/connectionManager');
const signinroutes = require('./src/routes/signinroutes')
const authroutes = require('./src/routes/authroutes');
const signincontroller = require('./src/controller/signincontroller');
const connectionResolver = require('./src/middleware/connectionresolver');
const { getAll } = require('./src/services/users');
const multer = require('multer');
const forms = multer();

const PORT = 3000;
const app = express();


app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '100mb' }));
app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 1000000 }));
app.use(express.json());
app.set('port', PORT);
app.use(bodyParser.json());

// allow-cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    }
    else {
        //move on
        next();
    }
});

//API route
//app.use('/api/auth', loginroutes);
app.use('/api/auth', signinroutes);
app.use(connectionResolver.resolve);
//app.use('/api/auth/v1', authroutes);
connectAllDb();

app.get('/api/auth/login', getAll);
//app.get('api/auth/users/:userId',getUserById);

app.listen(PORT, () => {
    console.log(`Express server started at PORT ${PORT}`)
});










