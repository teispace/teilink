import db from "@/config/db.config";
import { RowDataPacket } from "mysql2";

/**
 * @description Url model
 * @class UrlModel
 * @method createUrl - Create a new URL
 * @method getUrl - Get a URL by short URL
 * @example
 * import UrlModel from "./models/url.model";
 * const urlModel = new UrlModel();
 * urlModel.createUrl("https://example.com", "abc123");
 * urlModel.getUrl("abc123");
 */
class UrlModel {
  /**
   * @description Create a new URL
   * @param {string} url - The URL to create
   * @param {string} shortUrl - The short URL
   * @returns {Promise<object>} - The created URL
   * @throws {Error} - Throws error if there is an issue creating the URL
   * @example
   * urlModel.createUrl("https://example.com", "abc123");
   */
  public async createUrl(url: string, shortUrl: string) {
    try {
      const query = "INSERT INTO urls (url, short_url) VALUES (?, ?)";
      const result = await db.query(query, [url, shortUrl]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get a URL by short URL
   * @param {string} shortUrl - The short URL
   * @returns {Promise<object>} - The URL
   * @throws {Error} - Throws error if there is an issue getting the URL
   * @example
   * urlModel.getUrl("abc123");
   */
  public async getUrl(shortUrl: string) {
    try {
      const query = "SELECT * FROM urls WHERE short_url = ?";
      const result = await db.query<RowDataPacket>(query, [shortUrl]);
      if (result.length === 0) {
        return null;
      }
      return result[0];
    } catch (error) {
      throw error;
    }
  }
}

export default UrlModel;
