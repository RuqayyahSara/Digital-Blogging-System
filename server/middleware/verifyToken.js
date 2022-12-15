import jwt from "jsonwebtoken";
import config from 'config';

const { JWT } = config.get("SECRET_KEYS")

function authMiddleware(req, res, next) {
    try {
        let token = req.cookies['access_token'];
        const payload = jwt.verify(token, JWT); // decoding token & getting payload
        req.payload = payload;
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Access Denied. Invalid Token/Token Expired" });
    }
}

export default authMiddleware;