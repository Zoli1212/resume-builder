const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
        console.log(token)
  
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)

        req.body.user = decoded

  
        
  
        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
};