import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const token_secret = process.env.TOKEN_SECRET

export function createAccessToken(id) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            id,
            token_secret,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if(err)
                    reject(err)
                else
                    resolve(token)
            }
        );
    });
}