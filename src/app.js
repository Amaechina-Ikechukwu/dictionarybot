const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

const say = require("say");
const Telegraf = require("telegraf");
const botToken = "5742886926:AAHCBfDqtVjs_rudP6wQAZTU8b5kGweXYzY";
const bot = new Telegraf(botToken);
const ud = require("urban-dictionary");
router.get("/", (res, req) => {
  res.json({
    hellow: "hi",
  });
});
app.use("/.netlify/fuctions/api", router);

module.exports = serverless(app);
