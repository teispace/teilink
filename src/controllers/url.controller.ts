import UrlModel from "@/models/url.model";
import { isUrlValid, generateShortUrl } from "@/utils/urlUtils";
import { Request, Response } from "express";
import env from "@/utils/validateEnv";
import redisConfig from "@/config/redis.config";

const urlModel = new UrlModel();
class UrlController {
  public async createUrl(req: Request, res: Response) {
    try {
      let { url } = req.body;

      if (!url || !isUrlValid(url)) {
        return res.render("index", {
          message: {
            type: "error",
            text: "Invalid URL",
          },
        });
      }

      // add http:// to the URL if it doesn't have it
      const hasProtocol = url.match(/^https?:\/\//);

      if (!hasProtocol) {
        url = `http://${url}`;
      }

      let shortURLCode;
      let exists;

      do {
        shortURLCode = generateShortUrl();
        exists = await urlModel.getUrl(shortURLCode);
      } while (exists);

      await urlModel.createUrl(url, shortURLCode);

      const shortUrl = `${env.APP_URL}/${shortURLCode}`;

      return res.render("index", {
        message: {
          type: "success",
          text: shortUrl,
          shortUrl,
        },
      });
    } catch (error) {
      console.error(error);
      return res.render("index", {
        message: {
          type: "error",
          text: "Something went wrong",
        },
      });
    }
  }

  public async getUrl(req: Request, res: Response) {
    try {
      const shortUrl = req.params.shortUrl;

      //   check if the short URL exists in Redis
      const cachedUrl = await redisConfig.get(shortUrl);

      if (cachedUrl) {
        return res.redirect(cachedUrl);
      }

      const url = await urlModel.getUrl(shortUrl);

      if (!url) {
        return res.render("index", {
          message: {
            type: "error",
            text: "URL not found",
          },
        });
      }

      //   set the short URL in Redis
      await redisConfig.set(shortUrl, url.url);

      return res.redirect(url.url);
    } catch (error: any) {
      console.error(error);
      return res.render("index", {
        message: {
          type: "error",
          text: "Something went wrong",
        },
      });
    }
  }
}

export default UrlController;
