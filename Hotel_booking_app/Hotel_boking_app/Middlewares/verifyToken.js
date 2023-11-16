const { createError } = require('../utils/error');
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.Authorization;
    if (!token) {
        return next(createError(401, "you are not authenticated"));
    }
    jwt.verify(token, "TR8793T6R367DE93IWDE", (err, user) => {
        if (err) return (createError(403, "token is not valid"));

        req.user = user;
        next();
    })

};
exports.verifyuser = (req, res, next) => {
    verifyToken(req, res, next), () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "you are not authorized"))
        }

    }
}

exports.verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next), () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "you are not authorized"))
        }

    }
}