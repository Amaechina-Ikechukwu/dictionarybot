const say = require("say");
const { Telegraf } = require("telegraf");
const botToken = "5742886926:AAHCBfDqtVjs_rudP6wQAZTU8b5kGweXYzY";
const bot = new Telegraf(botToken);
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const ud = require("urban-dictionary");
router.get("/test", (res, req) => {
  res.json({
    hellow: "hi",
  });
});
bot.start((ctx) =>
  ctx.reply(
    "Welcome to Dictionary Bot made by Ikay.It reply definition with audio also."
  )
);
let shouldPlayAudio = Number;

bot.on("text", (ctx) => {
  let newWord = ctx.message.text.split();
  if (newWord.length > 1) {
    return ctx.reply("Only input a word");
  } else {
    ud.define(ctx.message.text)
      .then((results) => {
        ctx.reply(results[0].definition);
        say.export(
          results[0].definition,
          "",
          1,
          ctx.message.text + "audio.wav",
          (err) => {
            if (err) {
              return console.log(err);
            }
            ctx.replyWithVoice({
              source: `./${ctx.message.text}audio.wav`,
            });
          }
        );
      })
      .catch((error) => {
        return ctx.reply(error.message);
        console.error(`define (promise) - error ${error.message}`);
      });
  }
});

bot.launch();
