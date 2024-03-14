const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const  SECRET_KEY = "secretkey23456";
  const token = req.header('Authorization');

  if(!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ auth: false, message: 'Invalid token.' });
  }
};

module.exports = verifyJWT;
