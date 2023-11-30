
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'jdicsji'

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Failed to authenticate token');
    }

    req.userId = decoded.userId; 
    next();
  });
};
