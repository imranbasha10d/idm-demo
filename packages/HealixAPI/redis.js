import { createClient } from 'redis';

class Redis {
    client;
    constructor() {
        this.connectRedis();
    }
    static getInstance() {
        return new Redis();
    }
    async connectRedis() {
        this.client = createClient({
            host: "localhost", port: 6379
        });
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        await this.client.connect();
    }
    async setRedisValue(key, value) {
        console.log("setRedisValue: key: ", key);
        console.log("setRedisValue: value: ", value);
        await this.client.set(key, value);
        const getValue = await this.client.get(key);
        console.log("getValue: ", getValue);
        return getValue;
    }
    async getRedisValue(key) {
        console.log("getRedisValue: key: ", key);
        const getValue = await this.client.get(key);
        console.log("getValue: ", getValue);
        return getValue;
    }
}

export default Redis;