import crypto from "crypto";
import jwt from "jsonwebtoken";
import Redis from "./redis.js";
const redis = Redis.getInstance();

class Auth {
    constructor() { }
    getRandomSecret() {
        const random = crypto.randomBytes(32).toString('hex');
        console.log("getRandomSecret: random: ", random);
        return random;
    }
    generateHmacSecret(id, algorithm) {
        console.log("generateHmacSecret: id: ", id);
        console.log("generateHmacSecret: algorithm: ", algorithm);
        const randomSecret = this.getRandomSecret();
        const hmacSecret = crypto.createHmac(algorithm, randomSecret)
            .update(id)
            .digest('base64');
        console.log("generateHmacSecret: hmacSecret: ", hmacSecret);
        return hmacSecret;
    }
    async verifyVeridToken(id, token) {
        console.log("verifyVeridToken: id", id);
        console.log("verifyVeridToken: token", token);
        const hmac = await redis.getRedisValue(id);
        const isVerified = jwt.verify(token, hmac, function (err, decoded) {
            if (err || !decoded) {
                console.log("verifyVeridToken verifing", err);
                return null;
            }
            return decoded
        });
        console.log("isVerified: ", isVerified);
        return isVerified;
    }
}

export default Auth;