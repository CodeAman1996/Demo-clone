const router = require('express').Router()
const db = require('../config/db')
const bcrypt = require('bcryptjs')
const tenantcommon = require('../../knexfile');



exports.sign = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const hash = await bcrypt.hashSync(db_password, 10)
        const [tenantcommon] = await db('tenantcommon').insert({ username, hash }).returning('*')
        req.session.tenantcommon = tenantcommon
        res.json(tenantcommon)
    } catch (err) {
        if (err) {
            console.log(err);
            res.status(401).send('User undefined')
        } else {
            next(err)
        }
    }
}
// exports.log = async (req, res, next) => {
//     try {
//         const { email, password } = req.body
//         const user = await db('user').first('*').where({ email })
//         if (!user) {
//             console.log('No such user found:', req.body.email)
//             res.status(401).send('Wrong username and/or password')
//         } else {
//             const validPass = await bcrypt.compare(password, user.hash)
//             if (validPass) {
//                 req.session.user = user
//                 res.json(user)
//             } else {
//                 console.log('Incorrect password for user:', email)
//                 res.status(401).send('Wrong username and/or password')
//             }
//         }
//     } catch (err) {
//         next(err)
//     }
// }

