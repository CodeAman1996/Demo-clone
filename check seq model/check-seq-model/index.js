const express = require('express')
const session = require('express-session')
const sign = require('./src/middleware/loginmw');

const KnexStore = require('connect-session-knex')(session)
const db = require('./src/config/db')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const PORT = process.env.PORT || 3000
//const sessionStore = new KnexStore({ knex: db })
const app = express()
module.exports = app
if (process.env.NODE_ENV === 'test') {
    after('close the session store', () => sessionStore.stopExpiringSessions())
}
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'my best friend is Marley',
        //store: sessionStore,
        resave: false,
        saveUninitialized: false,
    })
)
app.use('/', sign);
app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
