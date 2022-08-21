import express, { json, urlencoded } from 'express';
import Auth from "./auth.js";
import Redis from "./redis.js";
const app = express();
const auth = new Auth();
const redis = Redis.getInstance();
app.use(json());
app.use(urlencoded({ extended: false }));

app.post('/generateHmacSecret', async function (req, res) {
    const { orgId, algorithm } = req.body;
    const HMAC_Secret = auth.generateHmacSecret(orgId, algorithm);
    const updated_secret = await redis.setRedisValue(orgId, HMAC_Secret);
    console.log("updated_secret: ", updated_secret);
    res.status(200).json({ HMAC_Secret })
})

app.post('/getUser/:orgId', async function (req, res) {
    const { orgId } = req.params;
    const verid_token = req.header('Authorization').split(' ')[1];
    const isVerifed = await auth.verifyVeridToken(orgId, verid_token);
    if (!isVerifed) return res.status(404).json({ message: "Not Authorized" })

    return res.status(200).json(isVerifed)
})

app.listen(3000, () => {
    console.log("Connected Verid API - http://localhost:3000");
})