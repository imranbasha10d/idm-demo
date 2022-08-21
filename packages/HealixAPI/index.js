import express, { json, urlencoded } from 'express';
import Auth from "./auth.js";
const app = express();
const auth = new Auth();
app.use(json());
app.use(urlencoded({ extended: false }));

app.post('/generateVeridToken', async function (req, res) {
    const data = req.body;
    const verid_token = await auth.generateVeridToken(data);
    res.status(200).json({ verid_token })
})

app.listen(4000, () => {
    console.log("Connected Healix API - http://localhost:4000");
})