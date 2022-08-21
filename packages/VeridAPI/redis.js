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
        await this.client.set(key, value);
        const getValue = await this.client.get(key);
        return getValue;
    }
    async getRedisValue(key) {
        const getValue = await this.client.get(key);
        return getValue;
    }
}

export default Redis;