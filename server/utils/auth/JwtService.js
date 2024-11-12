const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_KEY

class JwtService {

    static generateJwt = (payload) => {
        /*
        payload needs to receive 
        {
        useername: username
        password : password
        }
        */
        try {
            const token = jwt.sign(payload, secretKey);
            return token;
    
        } catch (error) {
            return error
        }
    }

    static verifyJwt = (token) => {

        try {
            const decoded = jwt.verify(token, secretKey);
      
            return decoded;
            
          } catch (err) {
            console.error('JWT verification failed:', err.message);
            return null;
          }
    }
}

module.exports = JwtService