// src/routes/urlRoutes.ts

import { Router } from "express";
import UrlController from "@/controllers/url.controller";

const router = Router();
const urlController = new UrlController();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", urlController.createUrl);

router.get("/:shortUrl", urlController.getUrl);

export default router;
