//const serverless = require('serverless-http');
// const express = require('express')
// const app = express();
// const PORT = 3002;

app.get('/', function (req, res) {
    res.send('Hello World!')
})
const dbConfig = require('./config/db-config');
const mysql = require('mysql')({
    config: dbConfig
});

module.exports = mysql;

myTestFunction: async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const functions = await db.query('SELECT * FROM functions');
    await db.end();
    if (functions) {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(functions),
        })
    } else {
        callback('error', {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: {
                message: 'No functions found.'
            },
        })
    }
}

// app.listen(PORT, () => {
//     console.log(`express server start on ${PORT}`)
// })

//module.exports.handler = serverless(app);