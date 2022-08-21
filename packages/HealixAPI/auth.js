import jwt from "jsonwebtoken";
import Redis from "./redis.js";
const redis = Redis.getInstance();

class Auth {
    constructor() { }
    async generateVeridToken(data) {
        console.log("generateVeridToken: ", data);
        const { orgId } = data;
        const hmac = await redis.getRedisValue(orgId);
        const verid_token = jwt.sign(data, hmac);
        console.log("verid_token: ", verid_token);
        return verid_token;
    }
}

export default Auth;