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

async function isRealJapaneseWord(word) {
  const response = await fetch(
    `https://api.wanikani.com/v2/subjects?types=vocabulary&slugs=${word}`
  );
  const data = await response.json();
  return data.total_count > 0;
}

function isValidJapaneseWord(word) {
  // Check length
  if (typeof word !== "string" || word.length < 1 || word.length > 10) {
    return false;
  }

  // Japanese Unicode ranges:
  // Hiragana: \u3040-\u309F
  // Katakana: \u30A0-\u30FF
  // Kanji: \u4E00-\u9FAF
  // Half-width katakana: \uFF65-\uFF9F
  return /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\uFF65-\uFF9F]+$/.test(word);
}

app.post("/explain", async (req, res) => {
  const { word, age } = req.body;

  // Validate the word before proceeding
  if (!isValidJapaneseWord(word)) {
    return res.status(400).json({
      error:
        "Invalid word. Please enter 1-10 Japanese characters (hiragana, katakana, kanji, or half-width katakana).",
    });
  }
  if (!isRealJapaneseWord(word)) {
    return res.status(400).json({
      error: "Invalid word. Please enter a real Japanese word.",
    });
  }

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
            `You are a Japanese language teaching API that provides exactly one response in markdown format. Follow these rules strictly:

1. Output must be in clean markdown suitable for ReactMarkdown
2. For all Japanese text:
   - Annotate each kanji character with its hiragana reading in square brackets, placed immediately after the kanji
   - Example: 漢[かん]字[じ]は難[むずか]しい
3. Structure your response with these sections:
   ## 言葉の説明
   ## 使い方の例
   ## 似ている言葉
4. Keep explanations simple and age-appropriate for ${age}歳
5. Example sentences should show natural usage
6. For similar words, explain subtle differences in usage
7. Never use any other furigana format
8. Never add extra commentary or disclaimers`.trim(),
        },
        {
          role: "user",
          content: `「${word}」という言葉を${age}歳の学習者に教えるように、以下の内容を日本語で分かりやすく説明してください：
1. 簡単な定義（年齢に合った言葉で）
2. 3つの自然な例文（会話形式を含む）
3. 最も近い類義語とその微妙な違い

全ての漢字には直後にひらがなルビを[ ]で記述してください。`,
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
