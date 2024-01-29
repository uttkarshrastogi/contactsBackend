const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = AsyncHandler(async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401)
      throw new Error("Unauthorized - Token verification failed")
      
    }

    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401)
      throw new Error("Unauthorized - Token verification failed")
    
      }
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    res.status(401)
    throw new Error("Unauthorized - Something went wrong with token validation")
  

  }
});

module.exports = validateToken;
