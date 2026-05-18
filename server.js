import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working");
});

async function askAI(prompt) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openrouter/free",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const reply = await askAI(message);

    res.json({ reply });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      reply: "Server error. Check backend logs."
    });
  }
});

app.post("/generate-plan", async (req, res) => {
  try {
    const topic = req.body.topic;

    const result = await askAI(
      `Create a beginner-friendly engineering study plan for ${topic}. 
      Include important topics, daily tasks, practice questions, and revision plan.`
    );

    res.json({ result });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      result: "Server error. Check backend logs."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});