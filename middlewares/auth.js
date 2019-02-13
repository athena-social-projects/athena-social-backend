const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    req.userData = jwt.verify(token, 'secret');
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authorization failed.',
    });
  }
};
