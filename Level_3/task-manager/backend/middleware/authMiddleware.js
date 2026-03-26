import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']; // get token from auth header
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({error: "Access denied. No token provided"}); // If token doesn't exist deny access.
    }

    try{
        const verified = jwt.verify(token, process.env.jwt_passkey); // verify token using passkey

        res.user = verified;
        next(); // move to controller
    }catch(error){
        res.status(403).json({error: "Invalid or expired token."});
    }
}