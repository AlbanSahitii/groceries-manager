const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;

class Middleware {
  static jwtAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, secretKey, (err, decoded) => {
        console.log(err);
        if (err) {
          throw {
            name: "TokenExpiredError",
            message: "Forbidden: Invalid or expired token",
            statusCode: 401,
          };
        }
        req.user = decoded;
        next();
      });
    } else {
      throw {
        name: "TokenExpiredError",
        message: "Unauthorized: No token provided",
        statusCode: 401,
      };
    }
  };

  static errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
      return res.status(400).send({
        type: "ValidationError",
        details: error.details,
      });
    }
    if (error.name === "TokenExpiredError") {
      console.log(`here`);
      return res.status(401).send(error.message);
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
