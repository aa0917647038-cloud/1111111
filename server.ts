import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number.parseInt(process.env.PORT ?? "3000", 10) || 3000;

  app.use(express.json());

  // API Route for Gemini AI Chatbot
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "訊息為必填。" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // Fallback response with simulated intelligence
        return res.json({
          text: `⚠️ [備用說明模式] 目前尚未在日本/台灣 AI 雲端配置有效的 GEMINI_API_KEY，為了讓您正常體驗，本應援局提供本教材對焦點答覆：\n\n您詢問了關於「${message}」。針對這個部分，在考試大綱中：\n1. **土地法第三十四條之一（多數決原則）**：人數過半、應有持分過半即可。若應有部分超過 2/3 則人數免計算。這在遺產分割及都更接案大要中特別頻頻出題。\n2. **新平均地權條例**：加強實施預售屋換約限制，是今年代書事務所接案與考證重點連動關鍵。\n\n💡 建議：如需體驗真實精準無休無止的 AI 問到飽，請於 [Settings > Secrets] 貼上您的 Gemini API 金鑰！`
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare professional Land Scrivener assistant instruction
      const systemInstruction = 
        "您是不動產法規專家與地政士（代書）備考及實務專家助手「地政士備考應援局 AI 隨身問」。" +
        "您的任務是協助用戶解答關於中華民國地政士考試、土地法、民法物權與信託、土地登記規則、土地稅法（如平均地權條例、房地合一、囤房稅2.0等）的法規與考試實務疑惑。" +
        "請用白話、親切、專業、富有鼓勵性、積極度且條理分明的繁體中文回答。" +
        "格式上多用 Markdown 清單、加粗、或小標題，必要時可用「小秘笈」等字樣。";

      // Reconstruct content array (Convert traditional history format to Gemini parts)
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const chatTurn of history.slice(-8)) { // limit history size to prevent token blowup
          contents.push({
            role: chatTurn.sender === "user" ? "user" : "model",
            parts: [{ text: chatTurn.text }]
          });
        }
      }
      
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.json({
        text: `💡 哎呀！目前 AI 連線稍有延遲。但針對您詢問的問題，名師團隊為您建議：\n\n應當重點複習最新房地合一稅率（持有 2 年內為 45%、2~5 年為 35%）與共有處分之程序，特別是共有人死亡後之公同共有繼承移轉要旨，此類內容在【地政士全科金榜班】中有最詳盡的說明喔！`
      });
    }
  });

  // Vite middle-wares setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
