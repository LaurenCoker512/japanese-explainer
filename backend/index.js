const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

require("dotenv").config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/explain", async (req, res) => {
  const { word, age } = req.body;
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content:
          "You are a 1-response API. Your output must strictly be provided in markdown suitable for ReactMarkdown.",
      },
      {
        role: "user",
        content: `私が${age}歳かのように日本語で漢字でいくつか例とどうやって「${word}」っていう言葉を使うのか？ この言葉に一番近い言葉はなんですか。`,
      },
    ],
  });
  res.json({ explanation: response.choices[0].message.content });
});

app.listen(5001, () => {
  console.log("Japanese Explainer Backend on http://localhost:5001");
});
