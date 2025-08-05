const express = require("express");
const cors = require("cors");
const sequelize = require("./models/index");
const WordResponse = require("./models/WordResponse");
const redis = require("redis");
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL has been established successfully.");

    // Sync all models (create tables if they don't exist)
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect().catch(console.error);

app.post("/explain", async (req, res) => {
  const { word, age } = req.body;
  const cacheKey = `explanation:${word}:${age}`;

  try {
    // 1. Check Redis cache first
    const cachedResponse = await redisClient.get(cacheKey);
    if (cachedResponse) {
      return res.json({ explanation: cachedResponse });
    }

    // 2. Check PostgreSQL if not in Redis
    const dbResult = await WordResponse.findOne({
      where: { word, age },
    });

    if (dbResult) {
      const explanation = dbResult.explanation;
      await redisClient.setEx(cacheKey, 86400, explanation); // Cache for 1 day
      return res.json({ source: "postgres", explanation });
    }

    // 3. If not in DB, call OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            `You are a 1-response API. Your output must strictly be provided in markdown suitable for ReactMarkdown.
For all Japanese words that use kanji, annotate each kanji character with its hiragana reading in square brackets, immediately after the kanji, like this: 漢[かん]字[じ]は難[むずか]しい。
Do this for every kanji character in your response, including in example sentences, headings, and explanations.
Do not use any other furigana format.`.trim(),
        },
        {
          role: "user",
          content: `私が${age}歳かのように日本語で漢字でいくつか例とどうやって「${word}」っていう言葉を使うのか？ この言葉に一番近い言葉はなんですか。`,
        },
      ],
    });

    // Store in PostgreSQL
    await WordResponse.create({
      word,
      age,
      explanation: aiResponse.choices[0].message.content,
    });

    // Store in Redis
    await redisClient.setEx(
      cacheKey,
      86400,
      aiResponse.choices[0].message.content
    );

    res.json({ explanation: aiResponse.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5001, () => {
  console.log("Japanese Explainer Backend on http://localhost:5001");
});
