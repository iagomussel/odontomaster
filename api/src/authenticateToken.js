var jwt = require('jsonwebtoken');

const Constants = require("./utils/Constants");
module.exports = function authenticateToken(req, res, next) {
    //return next(); // comment it out to enable authentication
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, Constants.JWT_KEY, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next();
    })

  }