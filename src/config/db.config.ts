import mysql, { Pool } from "mysql2";
import env from "@/utils/validateEnv";

class DbConfig {
  private db: Pool;

  constructor() {
    this.db = mysql.createPool({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      port: env.DB_PORT,
    });
  }

  public getDb(): Pool {
    return this.db;
  }

  public async checkConnection(): Promise<void> {
    this.db.getConnection((err, connection) => {
      if (err) {
        throw err;
      } else {
        console.log("Connected to the database");
        connection.release();
      }
    });
  }

  public async closeConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.end((err) => {
        if (err) {
          console.error("Error closing the connection:", err);
          return reject(err);
        }
        console.log("Connection closed");
        resolve();
      });
    });
  }

  public async createTableIfNotExists(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS urls (
        id INT AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(255) NOT NULL,
        short_url VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    try {
      await this.query(query);
    } catch (error) {
      throw error;
    }
  }

  public async query<T>(sql: string, params?: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.query(sql, params, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result as T);
      });
    });
  }
}

export default new DbConfig();
