const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;

class JwtService {
  static generateJwt = payload => {
    /*
        payload needs to receive 
        something other than it is, DEFINETLY NOT USERNAME PASSWORD
      
        */
    try {
      const token = jwt.sign(payload, secretKey, {
        expiresIn: "1m",
      });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  };

  static verifyJwt = async token => {
    const decoded = await jwt.verify(token, secretKey);

    return decoded;
  };
}

module.exports = JwtService;
