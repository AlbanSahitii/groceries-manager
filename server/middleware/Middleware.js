const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;

class Middleware {
  static jwtAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, secretKey, (err, decoded) => {
        console.log(err)
        if (err) {
          throw new Error("Forbidden: Invalid or expired token");
        }
        req.user = decoded;
        next();
      });
    } else {
      return res.status(401).json({message: "Unauthorized: No token provided"});
    }
  };

  static errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
      return res.status(400).send({
        type: "ValidationError",
        details: error.details,
      });
    }

    return res.status(400).send(error.message);
  };

  static validateRequest = schema => {
    return (req, res, next) => {
      const {error} = schema.validate(req.body, {abortEarly: false});

      if (error) {
        throw error;
      }
      next();
    };
  };

  static validateQuery = schema => {
    return (req, res, next) => {
      const {error} = schema.validate(req.query, {abortEarly: false});
      if (error) {
        throw error;
      }
      next();
    };
  };
}

module.exports = Middleware;
