const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY

class Middleware {

    static jwtAuth = (req, res, next) => {
        const authHeader = req.headers['authorization'];

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
                }

                req.user = decoded;
                next(); 
            });
        } else {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
    }



}

module.exports = Middleware;
