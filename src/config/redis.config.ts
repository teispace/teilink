import { createClient, RedisClientType } from "redis";

class RedisConfig {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({});

    // Register event handlers
    this.client.on("connect", () => {
      console.log("Redis client connected");
    });

    this.client.on("error", (err) => {
      console.error(`Something went wrong: ${err}`);
    });
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }

  public async disconnect(): Promise<void> {
    await this.client.quit();
    console.log("Redis client disconnected");
  }

  public getClient(): RedisClientType {
    return this.client;
  }

  // Example of a method to set a value in Redis
  public async set(key: string, value: any): Promise<void> {
    await this.client.set(key, value);
  }

  // Example of a method to get a value from Redis
  public async get(key: string): Promise<any> {
    const value = await this.client.get(key);
    return value;
  }
}

export default new RedisConfig();
