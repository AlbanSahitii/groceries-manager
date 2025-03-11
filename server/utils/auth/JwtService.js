const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;
const refreshKey = process.env.REFRESH_KEY;

class JwtService {
  static generateJwt = (payload, accessToken) => {
    /*
        payload needs to receive 
        something other than it is, DEFINETLY NOT USERNAME PASSWORD
      
        */
    try {
      const token = jwt.sign(payload, secretKey, {
        expiresIn: accessToken ? "15min" : "1d",
      });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  };

  static verifyJwt = async token => {
    const decoded = jwt.verify(token, secretKey);

    return decoded;
  };
}

module.exports = JwtService;
