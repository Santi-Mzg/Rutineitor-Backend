import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const token_secret = process.env.TOKEN_SECRET

export const authRequire = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json([req]);

    jwt.verify(token, token_secret, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        req.user = user;

        next();
    })
};  