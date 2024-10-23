import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const token_secret = process.env.TOKEN_SECRET

export const authRequire = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "No está autorizado", });

    jwt.verify(token, token_secret, async (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        req.user = user;

        next();
    })
};  